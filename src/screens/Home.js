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
import { connect } from 'react-redux';
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
            data: [],
            isConnected: false,
            favorites: [],
            resultsApi: 0,
            resultsSql: 0,
            isFavorites: false
        };

        console.log(props);
    }

    async componentDidMount() {
        this.getListFavorites();
    }

    getListFavorites = () => {
        try {
            sql.getAllFavorites().then((res) => {
                this.setState({
                    favorites: res,
                }, () => {
                    if (this.state.favorites.length > 0) {
                        this.setState({ loading: false, resultsSql: 1 });
                    } else {
                        this.setState({ loading: false });
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
        try {
            const res = await swapi.get('/people/', { search: `${name}` });
            if (res.data.count > 0) {
                this.setState({ data: res.data, loading: false, resultsApi: 1 });
            } else {
                Alert.alert('Error',
                    'Infelizmente não foi possivel encontrar nenhum personagem com esse nome');
                this.setState({ text: '', data: [], loading: false });
            }
        } catch (error) {
            console.log(error);
        }
    }

    //logica para lista o personagens na principal
    renderFavoriteList = () => (
        <View style={{ flex: 1 }}>
            <TitleTopBar title="Lista de favoritos" fontSize={16} marginTop={0} />
            <ListItemsPeople array={this.state.favorites} favorite />
        </View>
    );
    renderList = () => (<ListItemsPeople array={this.state.data.results} favorite={false} />);

    renderC3PO = () => (
        <View style={{ alignItems: 'center' }}>
            <Image source={C3PO} style={styles.imgC3PO} />
            <Text style={{ color: '#FFF', fontSize: 16, textAlign: 'center' }}>
                Procure por um personagem do StarWars e descubra
                mais sobre nosso universo.
            </Text>
        </View>
    );

    renderListDecision = () => {
        const { text, favorites, resultsApi, loading } = this.state;
        if (loading) {
            return (<ActivityIndicator size='large' color='#FFF' />);
        }
        if (favorites.length > 0 && resultsApi === 0) {
            return this.renderFavoriteList();
        }
        if (text === '' && favorites.length === 0) {
            return this.renderC3PO();
        }
        if (resultsApi === 1) {
            console.log('aqui');
            return this.renderList();
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <StatusBar hidden />
                <View style={styles.topBar}>
                    <TitleTopBar title="Star Wars APP" fontSize={35} marginTop={25} />
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
                                this.getListFavorites();
                                this.setState({ text: event.nativeEvent.text, resultsApi: 0 });
                            }
                        }}
                    />
                </View>
                <View style={styles.boxImg}>
                    {this.renderListDecision()}
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

const mapStateToProps = state => ({ isFavorites: state.isFavorites });

export default connect(mapStateToProps, null)(Home);
