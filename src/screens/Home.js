import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    StatusBar,
    View,
    NetInfo,
    Image,
    Text,
    Alert,
    ActivityIndicator
} from 'react-native';

//services
import swapi from './../services/swapi';
//imagem
import C3PO from './../imgs/c3-po.png';

//componentes
import ListItemsPeople from '../components/ListItemsPeople';
import TitleTopBar from '../components/TitleTopBar';

import sql from './../services/sqlitehelper';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            loading: true,
            data: {},
            isConnected: false,
            retorno: []
        };
    }

    async componentDidMount() {
        try {
            sql.getAllFavorites().then((res) => {
                this.setState({
                    retorno: res
                }, () => {
                    if (this.state.retorno.length === 0) {
                        this.setState({ length: false });
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    isConn = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                isConnected,
            });
        });
    }

    find = async (name) => {
        // this.isConn();
        // if (this.state.isConnected) {
        try {
            const res = await swapi.get('/people/', { search: `${name}` });
            if (res.data.count > 0) {
                this.setState({ data: res.data, loading: false });
            } else {
                Alert.alert('Error',
                    'Infelizmente não foi possivel encontrar nenhum personagem com esse nome');
                this.setState({ text: '', data: [], loading: false });
            }
        } catch (error) {
            console.log(error);
        }
        // } else {
        //     Alert.alert('Erro de conexão', 'Infelizmente você não possui internet');
        //     this.setState({
        //         text: '',
        //         loading: false,
        //         data: {},
        //     });
        // }
    }

    //logica para lista o personagens na principal

    renderFavoriteList = () => (
        <ListItemsPeople array={this.state.retorno} />
    )


    renderList = () => {
        if (this.state.text === '' && !this.state.loading) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Image source={C3PO} style={styles.imgC3PO} />
                    <Text style={{ color: '#FFF', fontSize: 16, textAlign: 'center' }}>
                        Procure por um personagem do StarWars e descubra
                        mais sobre nosso universo.
                    </Text>
                </View>
            );
        } else if (this.state.loading) {
            return (
                <ActivityIndicator size='large' color='#FFF' />
            );
        }
        return (
            <ListItemsPeople array={this.state.data.results} />
        );
    }
    render() {
        return (
            <View style={styles.view}>
                <StatusBar hidden />
                <View style={styles.topBar}>
                    <TitleTopBar title="Star Wars APP" marginTop={25} />
                    <TextInput
                        onSubmitEditing={(event) => {
                            this.setState({
                                text: event.nativeEvent.text,
                                loading: true
                            });
                            this.find(event.nativeEvent.text);
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
                    {this.state.retorno.length > 0 ? this.renderFavoriteList() : this.renderList()}
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1
    },
    imgC3PO: {
        alignSelf: 'center',
        height: 200,
        width: 200
    }
});

export default Home;
