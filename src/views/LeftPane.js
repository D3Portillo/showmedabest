import React, { Component } from 'react'
import ItemBox from "./ItemBox"
import styles from "../assets/js/styles"

class LeftPane extends Component{
    render(){
        return(
            <div className={"column has-background-black is-5 searchPane " + (this.props.active ? "active" : "")} style={styles.pane}>
                {
                    this.props.feed ? Object.keys(this.props.feed).map(e=><ItemBox title={this.props.feed[e][0]["title"]["label"]} artist={this.props.feed[e][0]["im:artist"]["label"]} key={e} pos={this.props.feed[e][1]}/>) : ""
                }
            </div>
        )
    }
}

export default LeftPane