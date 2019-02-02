import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet } from 'react-native';

class Details extends Component {

    render() {
        return (
            <View style={styles.view}>
                <StatusBar hidden />
                <View>
                    <Text style={styles.title}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default Details;
