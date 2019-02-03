import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

class TitleTopBar extends Component {
    render() {
        return (
            <Text style={styles.titleTopBar}>
                {this.props.title}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    titleTopBar: {
        //marginTop: 10,
        color: '#FFDE06',
        fontSize: 35,
        fontFamily: 'Starjedi',
        textAlign: 'center',
        marginHorizontal: 10
    }
});

export default TitleTopBar;
