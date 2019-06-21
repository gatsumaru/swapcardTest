import React, {Component} from 'react'
import Artist from '../Artist/Artist'


class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myId: this.props.location.state.myid,
      myKey: this.props.location.key,
    }
  }

  render() {
    let { myId } = this.state
    return (
      <div>
        <Artist id={myId}></Artist>
      </div>
    )
  }
}

export default Details;