import { createStore } from 'redux';

import reducersIsFavorites from './reducers/isFavorites';

const store = createStore(reducersIsFavorites);

export default store;
