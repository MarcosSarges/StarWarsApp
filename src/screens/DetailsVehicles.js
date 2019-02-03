import React, { Component } from 'react';
import {
    Text, View, StatusBar,
    TouchableOpacity, Image, StyleSheet,
    ScrollView, ActivityIndicator
} from 'react-native';

//services
import swapi from '../services/swapi';

//imagens
import Vehicles from './../imgs/XWing.png';

//componente
import TitleTopBar from '../components/TitleTopBar';

class DetailsVehicles extends Component {

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
        console.log(this.state.url);
        return (
            <ScrollView>
                <TitleTopBar title="ola" />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({

});

export default DetailsVehicles;