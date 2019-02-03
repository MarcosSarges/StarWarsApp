import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

class TitleTopBar extends Component {

    styles = StyleSheet.create({
        titleTopBar: {
            //marginTop: 10,
            color: '#FFDE06',
            fontSize: 35,
            fontFamily: 'Starjedi',
            textAlign: 'center',
            marginHorizontal: 10,
            marginTop: this.props.marginTop
        }
    });

    render() {
        return (
            <Text style={this.styles.titleTopBar}>
                {this.props.title}
            </Text>
        );
    }

}


export default TitleTopBar;
