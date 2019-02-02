import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    StatusBar,
    View,
    Image,
    Text,
    ActivityIndicator
} from 'react-native';

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
            loading: false
        };
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
                                text: event.nativeEvent.text
                            });
                        }}
                        style={styles.textInput}
                        placeholderTextColor='#CCC'
                        placeholder='Digite o nome do personagem'
                    />
                </View>
                {/*
                <View style={styles.boxImg}>
                    {
                        this.state.text === '' ?
                            <View style={{ alignItems: 'center' }}>
                                <Image source={C3PO} style={styles.imgC3PO} />
                                <Text style={{ color: '#FFF', fontSize: 16, textAlign: 'center' }}>
                                    Procure por um personagem do StarWars e descubra 
                                    mais sobre nosso universo.
                                </Text>
                            </View> :
                            <ActivityIndicator size='large' color='#FFF' />
                    }

                </View>
                */}
                <ListItems array={[{ 'name': 'a' }, { 'name': 'b' }, { 'name': 'c' }, { 'name': 'x' }, { 'name': 'k' }]} />
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
        fontSize: 16
    },
    boxImg: {
        alignItems: 'center',
        padding: 10,
        marginTop: 110
    },
    imgC3PO: {
        height: 256,
        width: 256
    }
});

export default Home;
