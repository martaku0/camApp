import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RadioButton from './RadioButton';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    changeActive(value){
        this.props.changeState(original=>{
            const newState = {...original}
            newState[this.props.type] = value
            return newState
        })
    }

    render() {
        return (
            <View style={{}}>
                <Text style={{color: 'yellow', fontSize: 16, textAlign: 'center'}}>{this.props.groupName}</Text>
                <FlatList
                        data={
                            this.props.data
                        }
                        renderItem={({ item}) =>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}><RadioButton active={this.props.currentState == item.value} onPress={() => {this.changeActive(item.value)}}/><Text style={{color: 'white'}}>{item.name}</Text></View> 
                        }
                        keyExtractor={(item, index) => index}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
});

export default RadioGroup;