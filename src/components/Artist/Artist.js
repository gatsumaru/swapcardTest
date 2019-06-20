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
      myArtistId: this.props.id,
      myFav: []
    }

    let value = localStorage.getItem("myfav")
    value = JSON.parse(value)
    this.state.myFav = value
    console.log(this.props)
  }

  removeFav(artistId) {
    let value = localStorage.getItem("myfav")
    value = JSON.parse(value)

    let valuefilter = value.filter(t => t.id !== artistId)
    localStorage.setItem("myfav", JSON.stringify(valuefilter))

    this.setState({
      myArtistId: artistId
    })

  }
  
  addFav(artistId, myName) {

    let myFav = [...this.state.myFav]
    const favtoPush = {
      id: artistId,
      name: myName
    }
    myFav.push(favtoPush)
    localStorage.setItem("myfav", JSON.stringify(myFav))
    this.setState({
      myArtistId: artistId
    })
  }



  render() {
    let value = localStorage.getItem("myfav")
    value = JSON.parse(value)
    let valuefilter = value.filter(t => t.id === this.state.myArtistId)

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
                      {valuefilter.length ? (
                        <Button onClick={() => this.removeFav(data.node.id)}>Unset</Button>) : (
                          <Button onClick={() => this.addFav(data.node.id, data.node.name)}>Set as Favorite</Button>)}
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