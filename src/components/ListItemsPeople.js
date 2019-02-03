import React, { Component } from 'react';
import { FlatList } from 'react-native';

//componente
import ItemPeople from './ItemPeople';

class ListItemsPeople extends Component {
    keyExtractor = (item) => (item.name);

    renderItemPeople = ({ item }) => (<ItemPeople name={item.name} el={item} url={item.url} />);
    render() {
        return (
            <FlatList
                data={this.props.array}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItemPeople}
            />
        );
    }
}


export default ListItemsPeople;
