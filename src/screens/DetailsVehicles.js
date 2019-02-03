import React, { Component } from 'react';
import {
    Text, View, FlatList,
    Image, StyleSheet, StatusBar,
    ActivityIndicator
} from 'react-native';

//services
import swapi from '../services/swapi';

//imagens
import Vehicles from './../imgs/XWing.png';

class DetailsVehicles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicles: [],
            loading: false
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        if (params.el.length > 0) {
            this.setState({
                loading: true
            });
        }
        params.el.forEach((el) => {
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
                    vehicles: this.state.vehicles.concat(res.data)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    keyExtractor = (item) => (item.name);

    testRenderList = () => {
        if (this.state.vehicles.length > 0) {
            return (
                <FlatList
                    data={this.state.vehicles}
                    renderItem={this.renderItemList}
                    keyExtractor={this.keyExtractor}
                />
            );
        } else if (this.state.vehicles.length === 0 && !this.state.loading) {
            return this.renderItemError();
        }
        return (<ActivityIndicator size='large' color='#FFF' />);
    }

    renderItemError = () => (
        <View style={styles.cardVehicles}>
            <Image source={Vehicles} style={{ height: 60, width: 60, alignSelf: 'center' }} />
            <Text style={styles.details} >Infelimente esse personagem não
                possui nenhum veículo.</Text>
        </View >
    );
    renderItemList = ({ item }) => (
        <View style={styles.cardVehicles}>
            <Image source={Vehicles} style={{ height: 60, width: 60, alignSelf: 'center' }} />
            <Text style={styles.titleVehicless}>{item.name.toLowerCase()}</Text>
            <Text style={styles.subtitleVehicles} >Detalhes</Text>
            <Text style={styles.details} >Modelo: {item.model}</Text>
            <Text style={styles.details} >Fabricante: {item.manufacturer}</Text>
            <Text style={styles.details} >Custo de fabricação: {item.cost_in_credits}</Text>
            <Text style={styles.details} >Velocidade maxima na atmosfera:
                {item.max_atmosphering_speed}</Text>
            <Text style={styles.details} >Equipe tecnica: {item.crew}</Text>
            <Text style={styles.details} >Passageiros: {item.passengers}</Text>
            <Text style={styles.details} >Capacidade da carga: {item.cargo_capacity}</Text>
            <Text style={styles.details} >Duração dos consumiveis:
                {item.consumables}</Text>
            <Text style={styles.details} >Classificação do Veículo:
                {item.vehicle_class}</Text>
        </View >
    );

    render() {
        return (
            <View style={{ backgroundColor: '#000', flex: 1 }} >
                <StatusBar hidden />
                {this.testRenderList()}
            </ View>
        );
    }
}
const styles = StyleSheet.create({
    cardVehicles: {
        borderColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    titleVehicless: {
        color: '#FFDE06',
        fontSize: 25,
        fontFamily: 'Starjedi',
        textAlign: 'center',
    },
    subtitleVehicles: {
        color: '#FFDE06',
        fontSize: 16,
        fontFamily: 'Starjedi',
        textAlign: 'center',
        marginTop: 8
    },
    details: {
        color: '#fff'
    },
});

export default DetailsVehicles;
