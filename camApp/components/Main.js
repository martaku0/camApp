import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import settings from '../defaultSettings.json'

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Main")
    }

    async setSettings(){
        if(!(await SecureStore.getItemAsync("address") && await SecureStore.getItemAsync("port"))){
            await SecureStore.setItemAsync("port", settings.port);
            await SecureStore.setItemAsync("address", settings.address);
        }
    }

    render() {
        this.setSettings()
        return (
            <View style={{flex:1, alignItems: "center", justifyContent: "center", backgroundColor: "#FF3C60"}} onStartShouldSetResponder={()=>{this.props.navigation.navigate("s2")}}>
                    <Text style={styles.header}>Camera App</Text>
                    <Text style={styles.text}>
                        show gallery pictures{"\n"}
                        take picture from camera{"\n"}
                        save photo to device{"\n"}
                        delete photos from device{"\n"}
                        share photo
                    </Text>
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
    text: {
        marginTop: 50,
        fontSize: 20,
        color: "white",
        textAlign: "center"
    }
})

export default Main;