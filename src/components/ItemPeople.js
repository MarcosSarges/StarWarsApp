import React, { Component } from 'react';
import {
    Text, TouchableOpacity,
    Image, StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';
//imagem
import C3PO from './../imgs/c3-po.png';
import HeartRed from './../imgs/heart_red.png';
import HeartWhite from './../imgs/heart_white.png';

class ItemPeople extends Component {


    goDetails = (url) => {
        this.props.navigation.navigate('DetailsPerson', { url });
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.cardTouchableOpacity}
                onPress={() => (this.goDetails(this.props.url))}
            >
                <Image source={C3PO} style={{ width: 80, height: 80, margin: 8 }} />
                <Text style={{ color: '#fff', fontSize: 16, margin: 8 }} >
                    {this.props.name}
                </Text>
                {/*
                <TouchableOpacity
                    style={styles.touchableOpacityFavorites}
                >
                    <Image
                        source={false ? HeartRed : HeartWhite}
                        style={{ height: 30, width: 30 }}
                    />
                </TouchableOpacity>
                */}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardTouchableOpacity: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
    },
    touchableOpacityFavorites: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});

export default withNavigation(ItemPeople);
