import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from "react-apollo"
import {Button, ListGroup, Container, Row, Col} from 'react-bootstrap'

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
      myArtistId: this.props.id
    }

    console.log(this.props)
  }


  addFav(artistName) {
    this.setState({
      dataFromQuery: [...this.state.dataFromQuery, artistName]
    })
    //this.sendFavDataToDetails()
  }

  sendFavDataToDetails = () => {
    this.props.favListCallback(this.state.dataFromQuery)
    console.log("call back of Test Artist")
  }

  render() {
    console.log("Value of dataFromQuery", this.state.dataFromQuery)


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
                        {<Button onClick={() => this.addFav(data.node.name)}>Set as Favorite</Button>}
                        {<Button onClick={() => this.sendFavDataToDetails()}>SendFavToDetails</Button>}

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