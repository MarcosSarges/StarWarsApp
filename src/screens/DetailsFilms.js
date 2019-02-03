import React, { Component } from 'react';
import {
    Text, View, StatusBar,
    TouchableOpacity, Image, StyleSheet,
    ScrollView, ActivityIndicator, FlatList
} from 'react-native';

//services
import swapi from '../services/swapi';

//imagens
import Films from './../imgs/video-camera.png';
//componente
import TitleTopBar from '../components/TitleTopBar';
import ListItems from '../components/ListItemsPeople';


class DetailsFilms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            films: []
        };
    }

    componentDidMount() {
        this.props.navigation.state.params.el.forEach((el) => {
            this.find(el.split('https://swapi.co/api/')[1]);
        });
    }

    find = async (url) => {
        try {
            const res = await swapi.get(url);
            if (res.detail === 'Not found') {
                console.log('erro');
            } else {
                this.setState({
                    films: this.state.films.concat(res.data)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    keyExtractor = (item, index) => (item.title);

    renderItemList = ({ item }) => {
        return (
            <View style={styles.cardFilm}>
                <Text style={styles.titleFilms}>{item.title}</Text>
                <Text style={styles.subtitleFilms} >Detalhes</Text>
                <Text style={styles.details} >Episódio: {item.episode_id}</Text>
                <Text style={styles.details} >Diretor: {item.director}</Text>
                <Text style={styles.details} >Produção: {item.producer}</Text>
                <Text style={styles.details} >Data de lançamento: {item.release_date}</Text>
                <Text style={styles.subtitleFilms} >Texto de abertura</Text>
                <Text style={styles.opening_crawl} >{item.opening_crawl}</Text>
            </View >
        );
    };
    render() {
        return (
            <View style={{ backgroundColor: '#000', flex: 1 }} >
                <Image source={Films} style={{ height: 80, width: 80, alignSelf: 'center' }} />
                <FlatList
                    data={this.state.films}
                    renderItem={this.renderItemList}
                    keyExtractor={this.keyExtractor}
                />
            </ View>
        );
    }
}
const styles = StyleSheet.create({
    cardFilm: {
        borderColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        paddingHorizontal: 8
    },
    titleFilms: {
        color: '#FFDE06',
        fontSize: 25,
        fontFamily: 'Starjedi',
        textAlign: 'center',
        marginHorizontal: 10
    },
    subtitleFilms: {
        color: '#FFDE06',
        fontSize: 16,
        fontFamily: 'Starjedi',
        textAlign: 'center',
        marginTop: 8
    },
    details: {
        color: '#fff'
    },
    opening_crawl: {
        textAlign: 'center',
        color: '#FFDE06',
        marginBottom: 8
    }
});

export default DetailsFilms;
