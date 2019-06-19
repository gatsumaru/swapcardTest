import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import  Home from './components/Home/Home'
import Navigation from './components/Layout/Navigation'
import Store from './components/Store'
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
  
  
  takeFavListFromDetails = (arrayList) => {
    //let test = this.state.favList
    //console.log("value of test : ", test)
    //test = [...test, arrayList]
    this.setState({favList: [...this.state.favList, arrayList]}, console.log("FavList from call back App : ", this.state.favList), console.log("arrayList from App : ", arrayList))
    //this.setState({favList: test})
    //console.log("Value of test : ", test)
  }

  render() {
    console.log("FavList from App: ", this.state.favList)
    return (
      <>
        <Store.Provider value={this.state.favList}>
          <ApolloProvider client={client}>
            <Navigation />
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/ArtistDetails"
                  render={(props) => <Details {...props} favListCallback={this.takeFavListFromDetails} />}
                />
              </Switch>
            </Router>
          </ApolloProvider>
        </Store.Provider>
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