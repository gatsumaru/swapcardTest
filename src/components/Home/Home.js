import React, {Component} from 'react'
import Details from '../ArtistDetails/ArtistDetails'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {Link} from 'react-router-dom'

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

    constructor (){
        super();
        this.state ={
            userInput: '',
            userSearch:'',
            myArtistId:'',
            detailsLaunched: true
        }
    }

    onChange(event) {
        this.setState({
            userInput:event.target.value
        } ,() => console.log(this.state.userInput))
    }

    launchSearch(event) {
        event.preventDefault();
        this.setState({
            userSearch:this.state.userInput,
        })
    }

    render () {
            return (
           <div>
                <Form>
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
                    <Query query={dynamicSearch} variables={{inputSearch: this.state.userSearch}}>
                    {({loading, data, error}) => {
                        if (loading) return <span>Loading</span>
                        if (error) return <span>Something happened</span>
                        return data.search.artists.nodes.map(artist => (
                            <Link to={{pathname:'/ArtistDetails', state:{myid:artist.id}}}>
                            <ListGroup>
                            <ListGroup.Item key={artist.id}
                            action onClick={()=> {this.setState({
                            myArtistId:artist.id})}}
                            style={{margin:"5px"}}>
                                {artist.name}
                            </ListGroup.Item> 
                            </ListGroup>
                            </Link>
                        ))
                    }}
                </Query> 
                  ) : (
                      <p></p>
                  )}

            </div>
        )
    }

}

export default Home;