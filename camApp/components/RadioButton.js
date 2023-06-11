import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <Pressable onPress={this.props.onPress} style={styles.button}>
                {this.props.active ? <View style={styles.buttonDot}/> : ""}
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 3,
        borderColor: "#FF3C60",
        borderRadius: 50,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonDot: {
        backgroundColor: '#FF3C60',
        borderRadius: 50,
        height: 10,
        width: 10,
    }
});

export default RadioButton;