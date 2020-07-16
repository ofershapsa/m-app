import React, { Component } from "react"

export default class Timer extends Component {
  state = {
    now: new Date(),
    message: "loading..."
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ now: new Date() })
    }, 1000)

    setTimeout(() => this.setState({ message: "got data from server" }), 5000)
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        {this.state.now.toString()}
      </div>
    )
  }
}
