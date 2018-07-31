import React, { Component } from 'react'
import styles from "../assets/js/styles"
import TopNav from "./TopNav"
import LeftPane from "./LeftPane"

class Container extends Component {
  constructor(props){
    super(props)
    this.state  = {feedIn: props.feed}
  }

  render() {
    return (
      <div style={styles.container}>
        <div className="columns is-gapless is-mobile" style={{minHeight: "100vh"}}>
          <div className="column is-7" style={{...styles.flexy,flexDirection: "column"}}>
            <h1 className="subtitle is-1 has-text-grey-light has-text-centered">
              TOP 100 of iTunes
            </h1>
            <h2 className="subtitlehas-text-centered">
              well, showin' u the best pals!
            </h2>
            <TopNav/>
          </div>
         {this.state.feedIn ? <LeftPane feed={this.state.feedIn}/> : null}
        </div>
      </div>
    )
  }
}

export default Container