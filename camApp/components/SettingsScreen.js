import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from "./MyButton";
import Dialog from "react-native-dialog";
import * as SecureStore from 'expo-secure-store';

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            hostIn:"",
            portIn:""
        };
        console.log("Settings")
    }

    async getSettings(){
        const p = await SecureStore.getItemAsync("port");
        const a = await SecureStore.getItemAsync("address");
        this.setState({
            port: p,
            address: a,
            hostIn: a,
            portIn: p
        })
    }

    componentDidMount(){
        this.getSettings()
    }

    editSettings = () => {
        this.setState({
            visibility: !this.state.visibility,
            hostIn: this.state.address,
            portIn: this.state.port
        })
    }

    setEditedSettings = async () => {
        await SecureStore.setItemAsync("address", this.state.hostIn)
        await SecureStore.setItemAsync("port", this.state.portIn)
        this.setState({
            address: this.state.hostIn,
            port: this.state.portIn
        })
        this.editSettings()

    }

    render() {


        return (
            <View style={{ flex: 1, backgroundColor: "#383838" }}>
                <Text style={styles.text}>Address: {this.state.address}</Text>
                <Text style={styles.text}>Port: {this.state.port}</Text>
                <MyButton title="Edit" onPress={this.editSettings}/>
                <Dialog.Container visible={this.state.visibility}>
                    <Dialog.Title>Save settings</Dialog.Title>
                    <Dialog.Input label={"Address:"} defaultValue={this.state.address} onChangeText={(value) => {
                        this.setState({
                            hostIn:value
                        })
                    }}/>
                    <Dialog.Input label={"Port:"} defaultValue={this.state.port} onChangeText={(value) => {
                        this.setState({
                            portIn:value
                        })
                    }}/>
                    <Dialog.Description>Do you want to save this settings?</Dialog.Description>
                    <Dialog.Button label="cancel"  onPress={this.editSettings}/>
                    <Dialog.Button label="ok" onPress={this.setEditedSettings}/>
                </Dialog.Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: { 
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        padding: 10
    }   
});

export default SettingsScreen;