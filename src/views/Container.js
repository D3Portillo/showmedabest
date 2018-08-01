import React, { Component } from 'react'
import styles from "../assets/js/styles"
import TopNav from "./TopNav"
import LeftPane from "./LeftPane"

class Container extends Component {
  constructor(props){
    super(props)
    this.state  = {searchPaneIsActive: false, query:""}
    this.searhPaneToggler = this.searhPaneToggler.bind(this)
    this.search = this.search.bind(this)
  }

  searhPaneToggler(){
    this.setState({searchPaneIsActive: !this.state.searchPaneIsActive})
    if(this.state.searchPaneIsActive){
      this.setState({query: ""})
    }
    document.querySelector(".searchPane").scrollTop = 0
  }

  search(e){
    this.setState({query : e.target.value})
  }

  componentDidUpdate(pprovs, pstate){
    if(pstate.query!==this.state.query){
      this.props.fetchJsonAgain(this.state.query)
    }
  }

  render() {
    return (
      <div style={styles.container}>
      {this.props.feed ? <TopNav feed={this.props.feed} searhPaneToggler={this.searhPaneToggler} active={this.state.searchPaneIsActive} value={this.state.query} search={this.search}/> : null}    
        <div className="columns is-mobile is-gapless" style={{minHeight: "100vh"}}>
          {/*We show an album cover from the top 5 albums gotten from the api*/} 
          <div className="shower column is-7" style={{...styles.shower,backgroundImage: `url(${this.props.feed.length>4 ? this.props.feed[Math.round(Math.random()*4)][0]["im:image"][2]["label"] : ""})`}}></div> 
          <div className="column is-7 titles-container" style={{...styles.flexy,flexDirection: "column", backgroundColor: "rgba(10,10,10,0.95)"}}>
            <h1 className="subtitle is-1 has-text-grey-light has-text-centered monoton-font" style={{marginBottom: 0}}>
              TOP<span style={styles.entranceText}><span style={styles.orangeOne} className="has-text-warning">100</span><span style={{marginTop: "-0.8rem"}} className="has-text-primary">of</span></span>ITUNES
            </h1>
            <div className="has-background-spot"></div>
            <h2 className="intro-animated has-text-grey">
              rock n rolling, showin' u the best pals!
            </h2>
          </div>
          {this.props.feed ? <LeftPane feed={this.props.feed} active={this.state.searchPaneIsActive}/> : null}
        </div>
      </div>
    )
  }
}

export default Container