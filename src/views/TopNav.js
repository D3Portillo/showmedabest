import React, { Component } from 'react'
import styles from "../assets/js/styles"
class TopNav extends Component {
    render() {
        return(
        <div style={{...styles.flexy,...styles.topNav}} className="topNav">
            <button className="button is-black has-background-spot"><i className="fas fa-heart has-text-black"></i></button>
            <button className="button is-black"><i className="fas fa-search has-text-spot"></i></button>
        </div>
        )
    }
}

export default TopNav

