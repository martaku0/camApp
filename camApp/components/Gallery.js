import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, Pressable, TouchableOpacity } from 'react-native';

import { Dimensions } from "react-native";

import * as MediaLibrary from 'expo-media-library';
import * as SecureStore from 'expo-secure-store';

import { ToastAndroid } from "react-native";

import MyButton from './MyButton';
import FotoItem from './FotoItem';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ids_to_delete: [],
            photos_to_upload: [],
            numColumns: 5,
            fotoWidth: (Dimensions.get("window").width - (5 * 5 + 6 * 5)) / 5,
            fotoHeight: (Dimensions.get("window").width - (5 * 5 + 6 * 5)) / 5,
            fotoXsize: 50
        };
        console.log("Gallery")
    }

    deletePhotos = () => {
        console.log(this.state.ids_to_delete)
        MediaLibrary.deleteAssetsAsync(this.state.ids_to_delete);
        this.setState({
            ids_to_delete: [],
            photos_to_upload: []
        });
        this.render()
    }

    uploadMulti = () => {
        if (this.state.photos_to_upload.length > 0) {
            const data = new FormData();
            this.state.photos_to_upload.forEach(p => {
                console.log(p)
                data.append('photo', p)
            });
            fetch(`http://${this.state.address}:${this.state.port}`, {
                method: 'POST',
                body: data,
            }).then(alert("Wysłano"))
            this.setState({
                ids_to_delete: [],
                photos_to_upload: []
            });
            this.render()
        }
    }

    async downloadPhotos() {
        const album = await MediaLibrary.getAlbumAsync("DCIM")
        let obj = await MediaLibrary.getAssetsAsync({
            album: album,
            first: 100,
            mediaType: 'photo',
            sortBy: 'modificationTime'
        })

        this.setState({
            images: obj.assets
        })
    }

    async componentDidMount() {
        this.getSettings()
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        else {
            this.downloadPhotos()
        }

        this.setState({
            ids_to_delete: []
        });
    }

    async componentDidUpdate() {
        this.downloadPhotos();
    }

    getSettings = async () => {
        this.setState({
            port: await SecureStore.getItemAsync("port"),
            address: await SecureStore.getItemAsync("address"),
        })
    }

    cameraButton = () => {
        this.props.navigation.navigate("s3")
    }

    settingsButton = () => {
        this.props.navigation.navigate("s5")
    }

    setLayout = () => {
        if (this.state.numColumns == 5) {
            this.setState({
                numColumns: 1,
                fotoWidth: (Dimensions.get("window").width - (1 * 5 + 6 * 5)),
                fotoHeight: (Dimensions.get("window").width - (1 * 5 + 6 * 5)),
                fotoXsize: 200
            });
        }
        else {
            this.setState({
                numColumns: 5,
                fotoWidth: (Dimensions.get("window").width - (5 * 5 + 6 * 5)) / 5,
                fotoHeight: (Dimensions.get("window").width - (5 * 5 + 6 * 5)) / 5,
                fotoXsize: 50
            });
        }
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#383838" }}>
                <View style={styles.buttons}>
                    <MyButton title="LAYOUT" onPress={this.setLayout} />
                    <MyButton title="CAMERA" onPress={this.cameraButton} />
                    <MyButton title="DELETE" onPress={this.deletePhotos} />
                    <MyButton title="UPLOAD" onPress={this.uploadMulti} />
                    <MyButton title="⚙︎" onPress={this.settingsButton} />
                </View>
                <View style={styles.fotoContainer}>
                    <FlatList
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                        data={
                            this.state.images
                        }
                        renderItem={({ item, index }) =>
                            <FotoItem style={styles.foto} toUse={this.state.ids_to_delete.includes(item.id)} fotoXsize={this.state.fotoXsize} fotowidth={this.state.fotoWidth} fotoheight={this.state.fotoHeight} id={item.id} fotouri={item.uri} onLongPress={(e) => {
                                if (this.state.ids_to_delete.includes(item.id)) {
                                    let inx = this.state.ids_to_delete.indexOf(item.id);
                                    const newIds = [...this.state.ids_to_delete]
                                    newIds.splice(inx, 1)
                                    this.setState({
                                        ids_to_delete: newIds
                                    })
                                    console.log(this.state.ids_to_delete);
                                    let inx1 = this.state.photos_to_upload.indexOf({ uri: item.uri, type: 'image/jpeg', name: `${item.id}.jpg` });
                                    const newTab = [...this.state.photos_to_upload]
                                    newTab.splice(inx1, 1)
                                    this.setState({
                                        photos_to_upload: newTab
                                    })
                                    console.log(this.state.photos_to_upload);
                                }
                                else {
                                    this.state.ids_to_delete.push(item.id);
                                    this.state.photos_to_upload.push({ uri: item.uri, type: 'image/jpeg', name: `${item.id}.jpg` })
                                }
                            }} onPress={
                                () => this.props.navigation.navigate("s4", { foto_uri: item.uri, foto_id: item.id, width: item.width, height: item.height })} />
                        }
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 72,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    buttons: {
        justifyContent: "space-around",

        flexDirection: 'row',
        margin: 5
    },
    fotoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Gallery;