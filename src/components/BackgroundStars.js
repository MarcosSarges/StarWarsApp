import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

//imagem
import BgStar from './../imgs/bgstar.png';

class BackgraundStars extends Component {

    render() {
        return (
            <View style={styles.bg}>
                <Image source={BgStar} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }
});

export default BackgraundStars;
