// Since containers are stateful we need to disable prefer-stateless-function
/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';
import { App } from 'grommet';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <App centered={false}>
          <Router history={history} routes={routes} />
        </App>

      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
