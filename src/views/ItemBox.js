import React, { Component } from 'react'
import styles from "../assets/js/styles"

class ItemBox extends Component{
    render(){
        return(
            <div style={styles.box} className="itemBox">
               <h1 onClick={_=>this.props.showModal(this.props.name, this.props.artist, this.props.cover, this.props.href)} className="subtitle is-size-4-mobile is-size-3-tablet has-text-grey has-text-weight-normal" style={styles.boxTitle}>
                #{1*this.props.pos + 1} - {this.props.name}
                {/* at firt time json file is taken from the api curr pos of albums is it's index thus current pos is index + 1*/}
                {/*See Loader view, its near this file*/}
               </h1>
               <h2 className="subtitle" style={{marginBottom: "0 !important"}}>
                {this.props.artist}
               </h2>
               <button className="button is-dark has-text-grey is-small favs" style={styles.favs} title="Add item to your favs list"><i className="fas fa-heart has-text-primary"></i></button>
            </div>
        )
    }
}

export default ItemBox