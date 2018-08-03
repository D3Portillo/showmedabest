import React, { Component } from 'react'
import styles from "../assets/js/styles"

class ItemBox extends Component{
    constructor(props){
        super(props)
        this.setFav = this.setFav.bind(this)
        this.state = {favId:false}
    }
    setFav(id){
        if(window.favs.hasFav(this.state.favId)){
            this.setState({favId: false})
            window.favs.deleteFav(id)
        }else{
            this.setState({favId: id})
            window.favs.setFav(id)
        }
    }
    render(){
        return(
            <div style={styles.box} className="itemBox">
               <h1 onClick={_=>this.props.showModal(this.props.title,  this.props.cover, this.props.href, this.props.albumId, this.props.price)} 
               className="subtitle is-size-4-mobile is-size-3-tablet has-text-grey has-text-weight-normal" style={styles.boxTitle}>
                #{1*this.props.pos + 1} - {this.props.name}
                {/* at firt time json file is taken from the api curr pos of albums is it's index thus current pos is index + 1*/}
                {/*See Loader view, its near this file*/}
               </h1>
               <h2 className="subtitle" style={{marginBottom: "0 !important"}}>
                {this.props.artist}
               </h2>
               <button onClick={_=>this.setFav(this.props.albumId)} className="button is-dark has-text-grey is-small favs" style={styles.favs} title="Add item to your favs list">
                    <i className={"fas fa-heart " + (this.state.favId ? "has-text-danger":"has-text-primary")}></i>
               </button>
            </div>
        )
    }
}

export default ItemBox