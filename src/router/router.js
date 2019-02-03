import { createStackNavigator, createAppContainer } from 'react-navigation';

//Screens
import HomeScreen from '../screens/Home';
import DetailsScreen from '../screens/Details';

const Rotas = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            },
        },
        Details: {
            screen: DetailsScreen,
            navigationOptions: {
                header: null
            },
        }
    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(Rotas);

export default AppContainer;
