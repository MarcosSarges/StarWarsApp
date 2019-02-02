import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet } from 'react-native';

//componente
import TitleTopBar from './../components/TitleTopBar';
class Details extends Component {

    render() {
        return (
            <View style={styles.view}>
                <StatusBar hidden />
                <TitleTopBar title={this.props.name} />
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        color: '#FFDE06',

    }
});

export default Details;
