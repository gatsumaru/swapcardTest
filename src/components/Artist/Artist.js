import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from "react-apollo"
import {Button, ListGroup, Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import FavoriteList from '../FavoriteList/FavoriteList';
import MyAlert from '../MyAlert/MyAlert';

const artistDetails = gql`
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
      myFav: [],
      showAlert : false
    }

    let value = localStorage.getItem("myfav")
    value = JSON.parse(value)
    this.state.myFav = value
  }

  removeFav(artistId) {
    let value = localStorage.getItem("myfav")
    value = JSON.parse(value)

    let valueFilter = value.filter(t => t.id !== artistId)
    localStorage.setItem("myfav", JSON.stringify(valueFilter))

    this.setState({
      myArtistId: artistId
    }, () => this.setState({showAlert:false}))
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
    }, () => this.setState({showAlert: true}))
  }

  render() {
    let value = localStorage.getItem("myfav")
    console.log("Value of value : ", value)
    value = JSON.parse(value)
    let valueFilter = value.filter(t => t.id === this.state.myArtistId)

    return (
      <div>
        <Container>
          <Row>
            <Col sm={8}>
              <Title><h2>Artist Details</h2></Title>
              <Query query={artistDetails} variables={{ artistId: this.state.myArtistId }}>
                {({ loading, data, error }) => {
                  if (loading) return <span>Loading</span>
                  if (error) return <span>Something happened</span>
                  return (
                    <div>
                      {this.state.showAlert ? (<MyAlert name={data.node.name}/>) : (null)} 
                      {valueFilter.length ? (
                        <Button style={{ marginBottom: "10px" }} onClick={() => this.removeFav(data.node.id)}>Unset</Button>) : (
                          <Button style={{ marginBottom: "10px" }} onClick={() => this.addFav(data.node.id, data.node.name)}>Set as Favorite</Button>)}
                      <Link to={{pathname: '/AlbumDetails', state:{myId: data.node.id}}}>
                          <h2 style={{ fontSize: "20px" }}>Album Details</h2>
                      </Link>
                      <h2 style={{ fontSize: "20px" }}>Name : {data.node.name}</h2>
                      <h2 style={{ fontSize: "20px" }}>Country : {data.node.country}</h2>
                      <div>
                        <h2 style={{ fontSize: "20px" }}>Some Releases : </h2> 
                        {data.node.releases.nodes.map(details => (
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

const Title = styled.h2`
font-family: 'Dancing Script', cursive;
margin : 35px;
text-align: center;
color: #37474F;
`
export default Artist;