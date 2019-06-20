import React, {Component} from 'react'

class FavoriteList extends Component {

    render() {
        let value = localStorage.getItem("myfav")
        value = JSON.parse(value)
        if (value) {
        return (
            <div>
                <h2>Fav List</h2>
                {
                    value.map(function(item, i){
                        console.log(item);
                        return <p key={i}>{item.name}</p>
                    })
                  }
            </div>
        )}
        return (<p>Nothing</p>)
    }
}

export default FavoriteList;