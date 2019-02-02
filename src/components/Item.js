import React, { Component } from 'react';
import { Text } from 'react-native';


class Item extends Component {

    render() {
        return (
            <Text style={{ color: '#fff' }} >
                {this.props.text}
                
            </Text>
        );
    }
}

export default Item;
