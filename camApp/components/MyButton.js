import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

class MyButton extends Component {
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
        backgroundColor: "#FF3C60",
        padding: 10,
        borderRadius: 20,
        height: 50
    },
    text: {
        color: "white",
        textAlign: "center",
        fontSize: 16
    }
});

export default MyButton;