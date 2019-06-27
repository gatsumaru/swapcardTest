import React, {Component} from 'react'
import {Navbar} from 'react-bootstrap'

class Navigation extends Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;