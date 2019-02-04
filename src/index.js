import React, { Component } from 'react';
import AppContainer from './router/router';
import SQLite from 'react-native-sqlite-storage';

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
