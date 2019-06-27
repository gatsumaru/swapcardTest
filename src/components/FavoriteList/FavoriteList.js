import React, {Component} from 'react'
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components'

class FavoriteList extends Component {

    render() {
        let value = localStorage.getItem("myfav")
        value = JSON.parse(value)
        if (value) {
            return (
                <div>
                    <Title>
                        <h2>Favorite List</h2>
                    </Title>
                    {
                        value.map(function (item, i) {
                            return (
                                <ListGroup key={i}>
                                    <ListGroup.Item key={i} style={{ margin: "5px" }}>
                                        {item.name}
                                    </ListGroup.Item>
                                </ListGroup>
                            )
                        })
                    }
                </div>
            )
        }
        return (null)
    }
}

const Title = styled.h2`
font-family: 'Dancing Script', cursive;
margin : 35px;
text-align: center;
color: #37474F;
`


export default FavoriteList;