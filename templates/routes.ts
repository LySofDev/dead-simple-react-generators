import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { default as Home } from './home';

const Home = () => (<Home />);

export default () => (
  <Switch>
    <Route path="/" exact render={Home} />
  </Switch>
);
