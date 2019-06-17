import React, {useState, Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import  Home from './components/Home/Home'
import Navigation from './components/Layout/Navigation'
import Store from './components/Store'
import Details from './components/ArtistDetails/ArtistDetails'

const client = new ApolloClient({
  uri : "https://graphbrainz.herokuapp.com/"
});



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      suce: [],
      
    }
  }
  
  
  takeFavList = (arrayList) => {
    this.setState({suce: arrayList})
  }

  render() {

  return (
      <>
      <Store.Provider value={this.state.suce}>
        <ApolloProvider client={client}>
        <Navigation/>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/ArtistDetails" 
              render={(props) => <Details {...props} suceCallback={this.takeFavList}/>}
              />
            </Switch>
          </Router>
        </ApolloProvider>
        </Store.Provider>
        { console.log("At the end", this.state.suce)}
      </>
  );
  }
}

export default App;

/*         
 So first of all for today : Get the data returned with react hook from Artist details
  Implement the set and unset button to manage Favlist ( you can watch nomad coder video for that )
  Create a sidebar to display fav list
  don't forget to handle the details  about the rendering if the user click directly to artist details check it with a condition
  also manage the display the view of all components and their elements inside the page with bootsrap
  Add the Album subpage
  Don't forget the Proptypes
  Refactor the code and organize it in different folder, try to split the app as components the most possible

*/