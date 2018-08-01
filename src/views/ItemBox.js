import React, { Component } from 'react'
import styles from "../assets/js/styles"

class ItemBox extends Component{
    render(){
        return(
            <div style={styles.box} className="itemBox" cover={this.props.cover}>
               <h1 className="subtitle is-3 has-text-grey  has-text-weight-normal" style={styles.boxTitle}>
                #{1*this.props.pos + 1} - {this.props.title}
               </h1>
               <h2 className="subtitle" style={{marginBottom: "0 !important"}}>
                {this.props.artist}
               </h2>
               <button className="button is-dark has-text-grey is-small favs" style={styles.favs} title="Add item to your favs list"><i className="fas fa-heart has-text-spot"></i></button>
            </div>
        )
    }
}

export default ItemBox