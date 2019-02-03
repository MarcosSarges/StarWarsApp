import { createStackNavigator, createAppContainer } from 'react-navigation';

//Screens
import HomeScreen from '../screens/Home';
import DetailsPersonScreen from '../screens/DetailsPerson';
import DetailsFilmsScreen from '../screens/DetailsFilms';
import DetailsStarshipsScreen from '../screens/DetailsStarships';
import DetailsVehiclesScreen from '../screens/DetailsVehicles';

const Rotas = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            },
        },
        DetailsPerson: {
            screen: DetailsPersonScreen,
            navigationOptions: {
                title: 'Características',
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                    textAlign: 'center', 
                },
            },
        },
        DetailsFilms: {
            screen: DetailsFilmsScreen,
            navigationOptions: {
                title: 'Filmes',
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                    textAlign: 'center'
                },
            },
        },
        DetailsStarships: {
            screen: DetailsStarshipsScreen,
            navigationOptions: {
                title: 'Naves',
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                    textAlign: 'center'
                },
            }
        },
        DetailsVehicles: {
            screen: DetailsVehiclesScreen,
            navigationOptions: {
                title: 'Veículos',
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                    textAlign: 'center'
                },
            }
        }
    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(Rotas);

export default AppContainer;
