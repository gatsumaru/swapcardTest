import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from "react-apollo"
import {Button, ListGroup, Container, Row, Col, Alert} from 'react-bootstrap'

import FavoriteList from '../FavoriteList/FavoriteList';

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

class Artist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataFromQuery: [],
      myArtistId: this.props.id,
    }

    console.log(this.props)
  }

  
  async removeFav(artistId) {
    const favList = this.state.dataFromQuery
    
      for (var i = 0; i < favList.length; i++) {
      console.log("value of i in the loop : ",  i)
      if (favList[i] === artistId) {
        favList.splice(i, 1)
        console.log("value of i ", i, " value of favList[i] : ", favList[i] )
      }
    }

   /* favList.map(test => {
      if (test === artistId) {
        const index = favList.indexOf(artistId)
        favList.splice(index, 1);
      }
    })*/

    /*let lists = favList.filter(test => {
      return test != artistId
    })*/

    // create a new test fucntion to sse how filet works

    await this.setState({
      dataFromQuery: favList
    })
    this.sendFavDataToDetails()
  }

  async addFav(artistId) {
    await this.setState({
      dataFromQuery: [...this.state.dataFromQuery, artistId]
    })

    this.sendFavDataToDetails()
  }


  sendFavDataToDetails = () => {
    this.props.favListCallback(this.state.dataFromQuery)
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={8}>
                <Query query={artistDetails} variables={{ artistId: this.state.myArtistId }}>
                  {({ loading, data, error }) => {
                    if (loading) return <span>Loading</span>
                    if (error) return <span>Something happened</span>
                    return (
                      <div>
                        {<Button onClick={() => this.addFav(data.node.id)}>Set as Favorite</Button>}
                        <Button onClick={() => this.removeFav(data.node.id)}>Unset</Button>
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
              </Col>
              <Col sm={4}>
                <FavoriteList />
              </Col>

            </Row>
          </Container>
        </div>
      ) 
  }

}

export default Artist;