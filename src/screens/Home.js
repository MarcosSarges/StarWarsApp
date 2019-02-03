import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    StatusBar,
    View,
    Image,
    Text,
    Alert,
    Button,
    ActivityIndicator
} from 'react-native';
//services
import swapi from './../services/swapi';
//imagem
import C3PO from './../imgs/c3-po.png';

//componentes
import ListItems from '../components/ListItems';
import TitleTopBar from '../components/TitleTopBar';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            loading: false,
            data: {}
        };
    }

    fild = async (name) => {
        const res = await swapi.get('/people/', { search: `${name}` });
        if (res.data.count > 0) {
            this.setState({ data: res.data, loading: false });
        } else {
            Alert.alert('Error',
                'Infelizmente não foi possivel encontrar nenhum personagem com esse nome');
            this.setState({ text: '', data: [], loading: false });
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <StatusBar hidden />
                <View style={styles.topBar}>
                    <TitleTopBar title="Star Wars APP" />
                    <TextInput
                        onSubmitEditing={(event) => {
                            this.setState({
                                text: event.nativeEvent.text,
                                loading: true
                            });
                            this.fild(event.nativeEvent.text);
                        }}
                        style={styles.textInput}
                        placeholderTextColor='#CCC'
                        placeholder='Digite o nome do personagem'
                        onChange={(event) => {
                            if (event.nativeEvent.text === '') {
                                this.setState({ text: event.nativeEvent.text, loading: false });
                            }
                        }}
                    />
                </View>

                <View style={styles.boxImg}>
                    {
                        this.state.text === '' && !this.state.loading ?
                            <View style={{ alignItems: 'center' }}>
                                <Image source={C3PO} style={styles.imgC3PO} />
                                <Text style={{ color: '#FFF', fontSize: 16, textAlign: 'center' }}>
                                    Procure por um personagem do StarWars e descubra
                                    mais sobre nosso universo.
                                </Text>
                            </View> : this.state.loading ?
                                <ActivityIndicator size='large' color='#FFF' /> :
                                <ListItems array={this.state.data.results} />
                    }

                </View>
            </View >
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#000',
    },
    topBar: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    textInput: {
        textAlign: 'center',
        borderColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        color: '#FFF',
        marginHorizontal: 16,
        fontSize: 16,
        height: 40
    },
    boxImg: {
        padding: 8,
    },
    imgC3PO: {
        alignSelf: 'center',
        height: 200,
        width: 200
    }
});

export default Home;
