import React, { Component } from 'react';
import * as MediaLibrary from "expo-media-library";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Pressable onPress={()=>{this.props.onPress()}} style={styles.container} onLongPress={()=>{this.props.onLongPress()}}>
                <ImageBackground source={{ uri: this.props.fotouri }} style={{ width: this.props.fotowidth, height: this.props.fotoheight, justifyContent: 'center'}}>
                    {this.props.toUse ? <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: this.props.fotoXsize, color: 'white'}}>+</Text> : <Text style={styles.text}>{this.props.id}</Text>}
                </ImageBackground>
            </Pressable >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});

export default FotoItem;