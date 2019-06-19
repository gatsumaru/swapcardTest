import React, {Component} from 'react'

import Artist from '../Artist/Artist'


class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myId: this.props.location.state.myid,
      myKey: this.props.location.key,
      favList: [],

    }
    console.log(this.props)
  }

  takeFavListFromArtist = async (arrayList) => {
    await this.setState({ favList: arrayList })
    this.sendFavDataToApp()
  }

  sendFavDataToApp = () => {
    this.props.favListCallback(this.state.favList)
  }

  render() {
    let { myId } = this.state
    return (
      <div>
        <h2>Artist details</h2>
        {<Artist id={myId} favListCallback={this.takeFavListFromArtist}></Artist>}
      </div>
    )
  }
}

export default Details;