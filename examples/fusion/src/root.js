// @flow
import React from 'react';
import {Route, Switch} from 'fusion-plugin-react-router';
import {LightTheme, ThemeProvider} from 'baseui';

import Home from './pages/home.js';
import PageNotFound from './pages/pageNotFound.js';

// if you want to use a custom theme pass it in to the ThemeProvider
const root = (
  <ThemeProvider theme={LightTheme}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={PageNotFound} />
    </Switch>
  </ThemeProvider>
);

export default root;
