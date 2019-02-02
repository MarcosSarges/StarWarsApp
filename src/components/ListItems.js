import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

//componente
import Item from './Item';

class ListItems extends Component {

    render() {
        return (
            <ScrollView contentContainerStyle={styles.list} >
                {this.props.array.map((el) => (
                    <Item key={el.name} name={el.name} styles={styles.item} />
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        paddingTop: 16,
        paddingHorizontal: 8,
        marginBottom: 8,
        borderColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
    },
});

export default ListItems;
