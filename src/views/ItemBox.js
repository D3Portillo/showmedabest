import React, { Component } from 'react'
import styles from "../assets/js/styles"

class ItemBox extends Component{
  constructor(props){
    super(props)
    this.setFav = this.setFav.bind(this)
    this.state = {favId:props.favId}
  }
  
  setFav(id){
    if(window.favs.hasFav(this.state.favId)){
      this.setState({favId: false})
      window.favs.deleteFav(id)
    }
    else{
      this.setState({favId: id})
      window.favs.setFav(id)
    }
    this.props.bindFavs()
  }

  render(){
    let props = this.props
    return(
      props.favsMode ? 
      <div style={{...styles.box,padding:  "0.45rem 1rem", borderColor: "#616161"}} className={"itemBox Me" + (!this.state.favId?" hideMe": "")}>
        <h1 className={"subtitle is-size-4-mobile has-text-weight-normal has-text-grey is-size-4-tablet"} style={styles.boxTitle}>
          #{1*props.pos + 1} - {props.name}
        </h1>
        <h2 className="subtitle" style={{marginBottom: "0 !important"}}>
          {props.artist}
        </h2>
        <button onClick={_=>this.setFav(props.albumId)} className="button is-black is-small favs" style={styles.favs} title="Remove this item to your favs list">
          <i className="fas fa-trash"></i>
        </button>
      </div>:

      <div style={styles.box} className="itemBox">
      <h1 onClick={_=>props.showModal(props.title,  props.cover, props.href, props.albumId, props.price, props.releaseDate)} 
      className="subtitle is-size-4-mobile has-text-weight-normal has-text-grey is-size-3-tablet" style={styles.boxTitle}>
        #{1*props.pos + 1} - {props.name}
      </h1>
      <h2 className="subtitle" style={{marginBottom: "0 !important"}}>
        {props.artist}
      </h2>
      <button onClick={_=>this.setFav(props.albumId)} className="button is-dark is-small favs" style={styles.favs} title="Add item to your favs list">
        <i className={"fas fa-heart " + (this.state.favId ? "has-text-danger":"has-text-primary")}></i>
      </button>
      </div>
    )
  }
}

ItemBox.defaultProps = {
  favsMode: false
}

export default ItemBox