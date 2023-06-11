import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

class CircleButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Pressable onPress={this.props.onPress} style={styles.button}>
                    <Text style={styles.text}>{this.props.title}</Text>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 10
    }, 
    text: {
        color: "#FF3C60",
        textAlign: "center",
        fontSize: 48
    }
});

export default CircleButton;