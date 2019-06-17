import React, {Component, useState} from 'react'
import gql from 'graphql-tag'
import {Query} from "react-apollo"
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import FavoriteList from '../FavoriteList/FavoriteList'

const artistDetails = gql `
query getArtistDetails($artistId: ID!)
 {
    node(id: $artistId) {
      ... on Artist {
        id
        name
        country
        releases(first: 10) {
          nodes {
            id
            title
          }
        }
      }
    }
  }
`

function Test(id) {

 /* const [fav, setFav] = useState([{
    name: "",
    id: ""
  }]); */
  const [fav, setFav] = useState([]);
  // are you sure is it worth to try to use hook ? the goal is to put the returned  data in the class details state or any other state to provide it to all child component

    {console.log(...fav)}

    return (
      <Query query={artistDetails} variables={{artistId:id}}>
          {({loading, data, error}) => {
              if (loading) return <span>Loading</span>
              if (error) return <span>Something happened</span>
              
              {console.log(...fav)}
              return (
                <div>
                {console.log(fav)}
                  <h2>Name : {data.node.name}</h2>
                  <Button onClick={() => setFav(...fav, [fav, data.node.name])}>Suce</Button>
                  <h2>Country : {data.node.country}</h2>
                  <div>Releases : {data.node.releases.nodes.map(details => (
                    <ListGroup>
                      <ListGroup.Item key={details.id}>
                      {details.title}
                      </ListGroup.Item>
                    </ListGroup>
                      ))} 
                  </div>
                </div>
              )
          }}
      </Query>
)}



const ArtistDetails = ({id})   =>  (

  
   Test(id)
 
  /*
  <div>
    {console.log(id)}
    
      <Query query={artistDetails} variables={{artistId:id}}>
          {({loading, data, error}) => {
              if (loading) return <span>Loading</span>
              if (error) return <span>Something happened</span>
              return (
                <div>
                  <h2>Name : {data.node.name}</h2>
                  <h2>Country : {data.node.country}</h2>
                  <div>Releases : {data.node.releases.nodes.map(details => (
                    <ListGroup>
                      <ListGroup.Item key={details.id}>
                      {details.title}
                      </ListGroup.Item>
                    </ListGroup>
                      ))} 
                  </div>
                </div>
              )
          }}
      </Query>
  </div> */
  
)

class Details extends Component {

   constructor(props) {
    super(props)
    this.state = {
      myId: this.props.location.state.myid,
      myKey: this.props.location.key,
      // use the key for the key value of details...

      favoriteArtist : [{
        id: "",
        name: ""
      }],

      favList: ["First test", "Second one", "Hey","Fuckers"],

      suce : ["Non", "Non", "J'ai", "dis", "Non !"]

    }
    console.log(this.props)
  }

  sendFavData = () => {
    this.props.suceCallback(this.state.suce)
  }

  render() {
    let {myId} = this.state
    return (
      <div>
        <h2>Artist details</h2>
        {<ArtistDetails id={myId}></ArtistDetails>}
        <Button onClick={() => this.sendFavData()}></Button>
        {<FavoriteList/>}
      </div>
    )
  }
} 

export default Details;