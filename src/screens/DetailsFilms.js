import React, { Component } from 'react';
import {
    Text, View, Image,
    StyleSheet, FlatList
} from 'react-native';

//services
import swapi from '../services/swapi';

//imagens
import Films from './../imgs/video-camera.png';

class DetailsFilms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            films: []
        };
    }

    componentDidMount() {
        this.props.navigation.state.params.el.forEach((el) => {
            //o split é necessario devido ao tipo de retorno
            //da url dos filmes e a biblioteca utilizada para realizar o get
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
                    //ele cria um novo array utilizando o existente e concatenando com o novo
                    films: this.state.films.concat(res.data)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    keyExtractor = (item) => (item.title);

    renderItemError = () => (
        <View style={styles.cardFilm}>
            <Image source={Films} style={{ height: 60, width: 60, alignSelf: 'center' }} />
            <Text style={styles.details} >Infelimente esse personagem não
                está presente em nenhum filme.</Text>
        </View >
    );

    renderItemList = ({ item }) => (
        <View style={styles.cardFilm} >
            <Image source={Films} style={{ height: 60, width: 60, alignSelf: 'center' }} />
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


    render() {
        return (
            <View style={{ backgroundColor: '#000', flex: 1 }} >
                {
                    //testar se exite algum elemento na lista
                    this.state.films.length > 0 ?
                        <FlatList
                            data={this.state.films}
                            renderItem={this.renderItemList}
                            keyExtractor={this.keyExtractor}
                        /> :
                        this.renderItemError()
                }
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
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    titleFilms: {
        color: '#FFDE06',
        fontSize: 25,
        fontFamily: 'Starjedi',
        textAlign: 'center',
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
    }
});

export default DetailsFilms;
