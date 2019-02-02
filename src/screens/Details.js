import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image, StyleSheet } from 'react-native';

//imagens
import Films from './../imgs/video-camera.png';
import Spaceships from './../imgs/millennium-falcon.png';
import Vehicles from './../imgs/XWing.png';
//componente
import TitleTopBar from './../components/TitleTopBar';
import BackgraundStars from './../components/BackgroundStars';

class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: this.props.url,
            name: 'Marcos',
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
            starships: []
        };
    }

    render() {
        return (
            <View style={styles.view}>
                <StatusBar hidden />
                <TitleTopBar title={this.state.name} />
                <BackgraundStars />
                <View style={styles.table}>
                    <Text style={styles.titleSection}>Características Físicas</Text>
                    <Text style={styles.feature}>Altura: {this.state.height}</Text>
                    <Text style={styles.feature}>Massa: {this.state.mass}</Text>
                    <Text style={styles.feature}>Cor do cabelo: {this.state.hair_color}</Text>
                    <Text style={styles.feature}>Cor de pele: {this.state.skin_color}</Text>
                    <Text style={styles.feature}>Cor dos olhos: {this.state.eye_color}</Text>
                    <Text style={styles.feature}>Aniversário: {this.state.birth_year}</Text>
                    <Text style={styles.feature}>Genero:{this.state.gender}</Text>
                    <Text style={styles.feature}>Terra natal: {this.state.homeworld}</Text>
                </View>
                <Text style={styles.titleSection}>Mais Detalhes</Text>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.titleSection}>Filmes</Text>
                        <Image style={styles.imgButtons} source={Films} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.titleSection}>Naves</Text>
                        <Image style={styles.imgButtons} source={Spaceships} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.titleSection}>veiculos</Text>
                        <Image style={styles.imgButtons} source={Vehicles} />
                    </TouchableOpacity>
                </View>
            </View>
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
        margin: 16
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
        height: 150,
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
    }
});

export default Details;
