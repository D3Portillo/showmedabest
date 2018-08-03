import React, { Component } from 'react'
import styles from "../assets/js/styles"

class TopNav extends Component {
  render() {
    return(
      <div style={{...styles.flexy,...styles.fadeIn,...styles.topNav,backgroundColor: this.props.active ? "rgba(10,10,10,0.95)" : ""}} className="topNav">
        {
          !this.props.active ? 
          <NormalMode showFavs={this.props.showFavs} searhPaneToggler={this.props.searhPaneToggler} favMode={this.props.favMode}/>
          :<Input searhPaneToggler={this.props.searhPaneToggler} value={this.props.value} search={this.props.search}/>
        }{/*When nav is active it means its in searching mode, and changes it's base component*/}
      </div>
    )
  }
}

//When user sees favs and search buttons only
const NormalMode=props=>{
  return(
    <div>
      <button onClick={props.showFavs} className="button is-black has-background-primary marginMe">
        <i className="fas fa-heart has-text-black"></i>
      </button>
      <button onClick={props.searhPaneToggler} className="button is-black marginMe">
        <i className="fas fa-search has-text-primary"></i>
      </button>
    </div>
  )
}

//User wants to search for an album
const Input=props=>{
  return(
    <div className="column is-4 is-offset-4">
      <div className="field has-addons">
            
        <div className="control is-expanded">
          <input value={props.value} onChange={props.search} className="input is-primary has-text-primary has-background-black" type="text" placeholder=""/>
        </div>
        <div className="control">
          <button onClick={props.searhPaneToggler} className="button is-primary has-text-black">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopNav