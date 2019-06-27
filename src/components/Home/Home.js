import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {Link} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'

import FavoriteList from '../FavoriteList/FavoriteList';

const dynamicSearch = gql `
query getSearch($inputSearch: String!) {
    search{
        artists(query: $inputSearch) {
            nodes{
                id
                name
            }
        }
    }
}
`

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userInput: '',
            userSearch: '',
            myArtistId: '',
        }
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value
        })
    }

    launchSearch(event) {
        event.preventDefault();
        this.setState({
            userSearch: this.state.userInput,
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Form style={{ marginTop: "40px" }}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="artist"
                                        placeholder="Enter Artist Name"
                                        value={this.state.userInput}
                                        onChange={(event) => this.onChange(event)} />
                                </Form.Group>
                                <Button onClick={(event) => this.launchSearch(event)}
                                    style={{margin: "5px"}}
                                >Search</Button>
                            </Form>

                            {this.state.userSearch ? (
                                <Query query={dynamicSearch} variables={{ inputSearch: this.state.userSearch }}>
                                    {({ loading, data, error }) => {
                                        if (loading) return <span>Loading</span>
                                        if (error) return <span>Something happened</span>
                                        return data.search.artists.nodes.map(artist => (
                                            <Link to={{ pathname: '/ArtistDetails', state: { myid: artist.id } }}>
                                                <ListGroup>
                                                    <ListGroup.Item key={artist.id}
                                                        style={{ margin: "5px" }}>
                                                        {artist.name}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Link>
                                        ))
                                    }}
                                </Query>
                            ) : (null)
                            }
                        </Col>
                        <Col sm={4}><FavoriteList /></Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Home;
