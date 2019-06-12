import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import  Home from './components/Home/Home'
import ArtistDetails from './components/ArtistDetails/ArtistDetails'
import Navigation from './components/Layout/Navigation'

const client = new ApolloClient({
  uri : "https://graphbrainz.herokuapp.com/"
});


function App() {
  return (
      <>
        <ApolloProvider client={client}>
        <Navigation/>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/ArtistDetails" component={ArtistDetails}/>
            </Switch>
          </Router>
        </ApolloProvider>
      </>
  );
}

export default App;
