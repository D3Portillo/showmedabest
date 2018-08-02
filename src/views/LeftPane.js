import React, { Component } from 'react'
import ItemBox from "./ItemBox"
import styles from "../assets/js/styles"

class LeftPane extends Component{
  render(){
    return(
      <div className={"column has-background-black is-5 searchPane " + (this.props.active ? "active" : "")} style={styles.pane}>
        <div className="column is-8 is-offset-2">
        {
          this.props.feed ? //hoping we are avoiding falsy values here
          Object.keys(this.props.feed).map(e=>
            <ItemBox  title={this.props.feed[e][0]["title"]["label"]} 
              artist={this.props.feed[e][0]["im:artist"]["label"]} key={e} 
              pos={this.props.feed[e][1]} cover={this.props.feed[e][0]["im:image"][2]["label"]}/>) : ""
        }
        </div>
      </div>
    )
  }
}

export default LeftPane