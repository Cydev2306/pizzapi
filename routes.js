import React from 'react';
import { Route, IndexRoute } from 'react-router';
import decode from 'jwt-decode';

// Routes smart components
import App from './containers/App.jsx';


export default (
  <div>
    <Route path="/" component={App} />
  </div>
);
