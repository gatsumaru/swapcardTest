import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {Image} from 'react-bootstrap'
import styled from 'styled-components'
import {Container, Col, Row} from 'react-bootstrap'


const albumDetails = gql`
query getAlbumDetails($artistId: ID!)
 {
    node(id: $artistId) {
      ... on Artist {
        id
        name
        lastFM {
            topAlbums(first: 10) {
              nodes {
                mbid
                title
                image
                listenerCount
                playCount
              }
            }
          }
      }
    }
  }
`

class Album extends Component {

    constructor(props){
        super(props)
        this.state = {
            myArtistId: this.props.location.state.myId
        }
    }

    render() {
        return (
            <div>
                <Title><h2>Album Details</h2></Title>
                <Query query={albumDetails} variables={{ artistId: this.state.myArtistId }}>
                    {({ loading, data, error }) => {
                        if (loading) return <span>Loading</span>
                        if (error) return <span>Something wrong happened</span>
                        return (
                            <div>

                                {data.node.lastFM.topAlbums.nodes.map((details, i) => (
                                    <div>
                                        <Container>
                                            <Row style={{ textAlign: "center" }}>
                                                <Col lg>
                                                    <div>
                                                        <Image style={{ width: "25%" }} src={details.image} roundedCircle />
                                                        <Title2><h3 style={{ fontSize: "1.7em" }}>{details.title}</h3></Title2>
                                                        <span>Listener Count : {details.listenerCount}</span>
                                                        <p>PLay Count : {details.playCount}</p>
                                                        <p>{i}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                ))}
                            </div>
                        )
                    }}
                </Query>
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
const Title2 = styled.h3`
font-size: 15px;
text-align: center;
color: #37474F;
font-family: 'Source Sans Pro', sans-serif;
margin: 15px;
`

export default Album;
