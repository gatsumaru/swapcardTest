import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from "react-apollo"
import { ListGroup } from 'react-bootstrap';
import Proptypes from 'prop-types'

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

const ArtistDetails = ({id}) => (
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
  </div>

)




class Details extends Component {

   constructor(props) {
    super(props)
    this.state = {
      myId: this.props.location.state.myid
    }
    console.log(this.props)
  }

  render() {
    let {myId} = this.state
    return (
    <div>
        <h2>Artist details</h2>
        <ArtistDetails id={myId} ></ArtistDetails>
      </div>
    )
  }
} 


export default Details;