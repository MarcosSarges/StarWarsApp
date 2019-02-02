import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

//imagem
import C3PO from './../imgs/c3-po.png';

class Item extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.cardTouchableOpacity}
            >
                <Image source={C3PO} style={{ width: 80, height: 80, margin: 8 }} />
                <Text style={{ color: '#fff' }} >
                    {this.props.name}
                </Text>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    cardTouchableOpacity: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 8,
        borderColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
    }
});

export default Item;
