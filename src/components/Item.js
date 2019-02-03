import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
//imagem
import C3PO from './../imgs/c3-po.png';

class Item extends Component {
    goDetails = (el) => {
        this.props.navigation.navigate('DetailsPerson', { el });
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.cardTouchableOpacity}
                onPress={() => (this.goDetails(this.props.el))}
            >
                <Image source={C3PO} style={{ width: 80, height: 80, margin: 8 }} />
                <Text style={{ color: '#fff', fontSize: 16, margin: 8 }} >
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
        marginBottom: 8,
        borderColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
    }
});

export default withNavigation(Item);
