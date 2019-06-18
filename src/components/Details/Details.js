import React, {Component, useState} from 'react'
import Button from 'react-bootstrap/Button'

import Artist from '../Artist/Artist'


class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myId: this.props.location.state.myid,
      myKey: this.props.location.key,
      // use the key for the key value of details...

      favoriteArtist: [{
        id: "",
        name: ""
      }],

      favList: [],

    }
    console.log(this.props)
  }


  takeFavListFromArtist = (arrayList) => {
    this.setState({ favList: arrayList })
    //this.sendFavDataToApp()
  }

  sendFavDataToApp = () => {
    this.props.favListCallback(this.state.favList)
    console.log("callback of details")
  }

  render() {
    let { myId } = this.state
    console.log("HEYYY", myId)
    return (
      <div>
        <h2>Artist details</h2>
        {<Artist id={myId} favListCallback={this.takeFavListFromArtist}></Artist>}
        {<Button onClick={() => this.sendFavDataToApp()}>SendToApp</Button>}
      </div>
    )
  }
}

export default Details;