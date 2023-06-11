import React, { Component } from 'react';
import * as MediaLibrary from "expo-media-library";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, BackHandler } from 'react-native';
import MyButton from "./MyButton"
import { Dimensions } from "react-native";
import * as Sharing from 'expo-sharing';
import * as SecureStore from 'expo-secure-store';
import CircleButton from './CircleButton';
import * as ImagePicker from 'expo-image-picker';

class BigFoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo_id: this.props.route.params.foto_id,
            photo_uri: this.props.route.params.foto_uri,
            width: this.props.route.params.width,
            height: this.props.route.params.height
        };
        console.log("BigFoto")
        console.log(this.state.photo_id)
    }

    async componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        this.getSettings()
    }

    async componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack()
        return true;
    }

    deletePhotoHandler = () => {
        this.deletePhoto([this.state.photo_id])
    }

    async deletePhoto(array_of_ids) {
        await MediaLibrary.deleteAssetsAsync(array_of_ids);
        this.props.navigation.navigate("s2");
    }

    sharePhoto = () => {
        if (Sharing.isAvailableAsync()) {
            Sharing.shareAsync(this.props.route.params.foto_uri, {})
        }
        else {
            alert('brak uprawnień do udostępniania zdjęć')
        }
    }

    imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const data = new FormData();
            data.append('photo', {
                uri: result.assets[0].uri,
                type: "image/jpeg",
                name: result.assets[0].fileName + '.jpg'
            }
            )
            fetch(`http://${this.state.address}:${this.state.port}`, {
                method: 'POST',
                body: data,
            }).then(alert("Wysłano"))
        }
    }

    getSettings = async () => {
        this.setState({
            port: await SecureStore.getItemAsync("port"),
            address: await SecureStore.getItemAsync("address"),
        })
    }

    uploadPhoto = () => {
        const data = new FormData();
        data.append('photo', {
            uri: this.props.route.params.foto_uri,
            type: "image/jpeg",
            name: this.props.route.params.foto_id + '.jpg'
        })
        fetch(`http://${this.state.address}:${this.state.port}`, {
            method: 'POST',
            body: data,
        }).then(alert("Wysłano"))
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{ uri: this.state.photo_uri }} style={styles.image} />
                <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>{this.state.width} x {this.state.height}</Text>
                <View style={styles.buttons}>
                    <MyButton title="SHARE" onPress={this.sharePhoto} />
                    <MyButton title="DELETE" onPress={this.deletePhotoHandler} />
                    <MyButton title="UPLOAD" onPress={this.uploadPhoto} />
                    <CircleButton title="x" onPress={this.imagePicker} />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        gap: 10,
        backgroundColor: "#383838",
    },
    image: {
        width: Dimensions.get("window").width - 40,
        height: Dimensions.get("window").height - 300,
        borderRadius: 10,
        resizeMode: 'stretch'
    },
    buttons: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        gap: 40,
        height: 40
    }
});

export default BigFoto;