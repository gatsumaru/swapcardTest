import React, {Component} from 'react'
import { ListGroup} from 'react-bootstrap';
import Store from '../Store'

class FavoriteList extends Component {

    render() {

        return (
            <div>
                <h2>Fav List</h2>
                <Store.Consumer>{store => store.map(fav => (
                    <ListGroup>
                        <ListGroup.Item>
                            {fav}
                        </ListGroup.Item>
                    </ListGroup>
                ))}
                </Store.Consumer>
            </div>
        )
    }
}

export default FavoriteList;