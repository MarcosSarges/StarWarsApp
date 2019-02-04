import React, { Component } from 'react';
import {
    Text, View, StatusBar,
    TouchableOpacity, Image, StyleSheet,
    ScrollView, ActivityIndicator
} from 'react-native';

//services
import swapi from '../services/swapi';
import sql from './../services/sqlitehelper';

//imagens
import Films from './../imgs/video-camera.png';
import Spaceships from './../imgs/millennium-falcon.png';
import Vehicles from './../imgs/XWing.png';
import HeartRed from './../imgs/heart_red.png';
import HeartWhite from './../imgs/heart_white.png';
//componente
import TitleTopBar from '../components/TitleTopBar';

class DetailsPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            name: '',
            height: '',
            mass: '',
            hair_color: '',
            skin_color: '',
            eye_color: '',
            birth_year: '',
            gender: '',
            homeworld: '',
            films: [],
            species: [],
            vehicles: [],
            starships: [],
            loading: true,
            favorites: [],
            isFavorites: true,
            exist: true
        };
    }
    componentDidMount() {
        this.findPeople(this.props.navigation.state.params.url);
        try {
            // sql.insertFavorites('Luke Skywalker', 'https://swapi.co/api/people/1/');
            sql.getAllFavorites().then((res) => {
                this.setState({
                    favorites: res,
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    findPeople = async (url) => {
        const res = await swapi.get(url);
        if (res.detail === 'Not found') {
            console.log('erro');
        } else {
            this.setState({
                url: res.data.url,
                name: res.data.name.toLowerCase(),
                height: res.data.height,
                mass: res.data.mass,
                hair_color: res.data.hair_color,
                skin_color: res.data.skin_color,
                eye_color: res.data.eye_color,
                birth_year: res.data.birth_year,
                gender: res.data.gender,
                homeworld: res.data.homeworld,
                films: res.data.films,
                species: res.data.species,
                vehicles: res.data.vehicles,
                starships: res.data.starships,
                loading: false
            }, () => {
                this.setState({
                    exist: this.exitsFavorites(this.state.name)
                });
                this.findHome(this.state.homeworld.split('https://swapi.co/api/')[1]);
            });
        }
    }

    findHome = async (url) => {
        const res = await swapi.get(url);
        if (res.detail === 'Not found') {
            console.log('erro');
        } else {
            this.setState({
                homeworld: res.data.name,
                loading: false
            });
        }
    }

    insertFavorites = (name, url) => {
        sql.insertFavorites(name, url);
        this.setState({ isFavorites: true, exist: true });
    }

    deleteFavorites = (url) => {
        sql.deleteFavorites(url);
        this.setState({ isFavorites: false });
    }

    exitsFavorites = (name) => {
        let exist = false;
        if (this.state.favorites.length > 0) {
            this.state.favorites.forEach((el) => {
                if (el.name.toLowerCase() === name.toLowerCase()) {
                    exist = true;
                }
            });
        }
        return exist;
    }

    renderButtonFavorites = () => {
        if (this.state.exist && this.state.isFavorites) {
            return (
                <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => (this.deleteFavorites(this.state.url))}
                >
                    <Image
                        source={HeartRed}
                        style={styles.heartImage}
                    />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                style={styles.heartButton}
                onPress={() => (this.insertFavorites(this.state.name, this.state.url))}
            >
                <Image
                    source={HeartWhite}
                    style={styles.heartImage}
                />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView style={styles.view}>
                <StatusBar hidden />
                <TitleTopBar title={this.state.name} fontSize={35} />
                <View style={styles.table}>
                    <Text style={styles.titleSection}>Características Físicas</Text>
                    <Text style={styles.feature}>Altura: {this.state.height}</Text>
                    <Text style={styles.feature}>Massa: {this.state.mass}</Text>
                    <Text style={styles.feature}>Cor do cabelo: {this.state.hair_color}</Text>
                    <Text style={styles.feature}>Cor de pele: {this.state.skin_color}</Text>
                    <Text style={styles.feature}>Cor dos olhos: {this.state.eye_color}</Text>
                    <Text style={styles.feature}>Aniversário: {this.state.birth_year}</Text>
                    <Text style={styles.feature}>Genero: {this.state.gender}</Text>
                    {this.state.loading ? <ActivityIndicator size='small' color='#FFF' /> :
                        <Text style={styles.feature}>Terra natal: {this.state.homeworld}</Text>}
                </View>
                <Text style={styles.titleSection}>Mais Detalhes</Text>
                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => (this.props.navigation.navigate('DetailsFilms',
                            { el: this.state.films }))}
                    >
                        <Text style={styles.titleSection}>Filmes</Text>
                        <Image style={styles.imgButtons} source={Films} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => (this.props.navigation.navigate('DetailsStarships',
                            { el: this.state.starships }))}
                    >
                        <Text style={styles.titleSection}>Naves</Text>
                        <Image style={styles.imgButtons} source={Spaceships} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => (this.props.navigation.navigate('DetailsVehicles',
                            { el: this.state.vehicles }))}
                    >
                        <Text style={styles.titleSection}>veiculos</Text>
                        <Image style={styles.imgButtons} source={Vehicles} />
                    </TouchableOpacity>
                </View>
                {this.renderButtonFavorites()}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#000',
    },
    table: {
        borderColor: '#FFDE06',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginTop: 16,
        marginHorizontal: 16
    },
    feature: {
        color: '#FFF',
        fontSize: 14,
        elevation: 10
    },
    titleSection: {
        color: '#FFDE06',
        fontSize: 20,
        fontFamily: 'Starjedi',
        textAlign: 'center',
    },
    button: {
        borderColor: '#FFDE06',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        height: 120,
        width: 150
    },
    imgButtons: {
        height: 50,
        width: 50
    },
    viewButtons: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    heartButton: {
        position: 'absolute',
        bottom: 30,
        right: 15
    },
    heartImage: {
        height: 30,
        width: 30,
    }
});

export default DetailsPerson;
