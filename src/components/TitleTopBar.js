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
        marginTop: 20,
        color: '#FFDE06',
        fontSize: 40,
        fontFamily: 'Starjedi',
        textAlign: 'center'
    }
});

export default TitleTopBar;
