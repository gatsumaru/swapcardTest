import React, {Component} from 'react'
import {Alert} from 'react-bootstrap'

class MyAlert extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            show: true
        }
        console.log("value of the props", this.props)
        console.log(this.state.name)

    }

    render() {
        const handleDismiss = () => this.setState({ show: false })
        if (this.state.show) {
            return (
                <Alert variant='primary' onClose={handleDismiss} dismissible>
                    {this.state.name} has been added to your favorites
            </Alert>)
        }
        return (null)
    }
}

export default MyAlert;