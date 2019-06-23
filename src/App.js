import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import  Home from './components/Home/Home'
import Navigation from './components/Layout/Navigation'
import Details from './components/Details/Details'

const client = new ApolloClient({
  uri : "https://graphbrainz.herokuapp.com/"
});


function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <Navigation />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/ArtistDetails" component={Details} />
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
}
export default App;
