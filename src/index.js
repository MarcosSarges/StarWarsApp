import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppContainer from './router/router';
//redux
import store from './redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
