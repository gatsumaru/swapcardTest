import React, {Component} from 'react'
import {Navbar, Nav} from 'react-bootstrap'

class Navigation extends Component {

    render() {
        return (
            <div>
                {console.log("Navbar !")}
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/ArtistDetails">Artist Details</Nav.Link>
                    </Nav>
                </Navbar>
            </div>

        )
    }
}

export default Navigation;