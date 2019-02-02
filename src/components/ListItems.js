import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

//componente
import Item from './Item';

class ListItems extends Component {

    render() {
        return (
            <ScrollView>
                {this.props.array.map((el) => (
                    <Item key={el.name} text={el.name} />
                ))}
            </ScrollView>
        );
    }
}

export default ListItems;
