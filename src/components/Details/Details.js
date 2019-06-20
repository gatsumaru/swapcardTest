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

  render() {
    let { myId } = this.state
    return (
      <div>
        <h2>Artist details</h2>
        {<Artist id={myId}></Artist>}
      </div>
    )
  }
}

export default Details;