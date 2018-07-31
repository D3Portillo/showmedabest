import React, { Component } from 'react'
import styles from "../assets/js/styles"

class ItemBox extends Component{
    constructor(props){
        super(props)
        this.state = {name : props.name, artist: props.artist, pos: (1*props.pos + 1)}
        console.log(this.state.pos)
    }

    render(){
        return(
            <div style={styles.box} className="itemBox">
               <h1 className="title has-text-grey  has-text-weight-normal" style={styles.boxTitle}>
               #{this.state.pos} - {this.state.name}
               </h1>
               <h2 className="subtitle" style={{marginBottom: "0 !important"}}>
               {this.state.artist}
               </h2>
               <button className="button is-dark has-text-grey is-small favs is-outlined" style={styles.favs} title="Add item to your favs list"><i className="fas fa-heart has-text-spot"></i></button>
            </div>
        )
    }
}

export default ItemBox