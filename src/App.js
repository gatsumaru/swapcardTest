import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import  Home from './components/Home/Home'
import Navigation from './components/Layout/Navigation'
import Details from './components/Details/Details'

const client = new ApolloClient({
  uri : "https://graphbrainz.herokuapp.com/"
});



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      favList: [],
    }
  }

  render() {

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
}

export default App;

/*         
  don't forget to handle the details  about the rendering if the user click directly to artist details check it with a condition ? delete the link in navbar ? 
  Add the Album subpage
  Don't forget the Proptypes
  How to send array of object
  Add the remove button with splice map all the array and splice on the ID value
*/