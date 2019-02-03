import React, { Component } from 'react';
import {
    Text, View, StatusBar,
    TouchableOpacity, Image, StyleSheet,
    ScrollView, ActivityIndicator
} from 'react-native';

//services
import swapi from '../services/swapi';

//imagens
import Spaceships from './../imgs/millennium-falcon.png';
//componente
import TitleTopBar from '../components/TitleTopBar';

class DetailsStarships extends Component {

    find = async (url) => {
        const res = await swapi.get(url);
        if (res.detail === 'Not found') {
            console.log('erro');
        } else {
            this.setState({
                homeworld: res.data.name,
                loading: false
            });
        }
    }

    render() {
        return (
            <ScrollView>
                <TitleTopBar title="ola" />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({

});

export default DetailsStarships;
