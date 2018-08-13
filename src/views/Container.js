import React, { Component } from 'react'
import styles from "../assets/js/styles"
import TopNav from "./TopNav"
import LeftPane from "./LeftPane"
import Favs from "./Favs"
import Background from "./Background"

class Container extends Component {
  constructor(props){
    super(props)
    this.state  = {searchPaneIsActive: false, query:"", favsShowing: false, favs: false, favsBinder: window.favs.getFavs()}
    this.searhPaneToggler = this.searhPaneToggler.bind(this)
    this.search = this.search.bind(this)
    this.showFavs = this.showFavs.bind(this)
    this.bindFavs = this.bindFavs.bind(this)
  }

  searhPaneToggler(){
    this.setState({searchPaneIsActive: !this.state.searchPaneIsActive})
    if(this.state.searchPaneIsActive){
      this.setState({query: ""})
    }
    document.querySelector(".searchPane").scrollTop = 0
    //everytime the TopNav refreshes its scrolled up
  }

  search(e){
    this.setState({query : e.target.value})
    //wildly setting state as query for the json album filtering 
  }

  componentDidUpdate(pprops, pstate){
    if(pstate.query!==this.state.query){
      this.props.fetchJsonAgain(this.state.query)
      //if the prevState is diff current state then we gotta fetch a new filtered arr
    }
  }

  componentDidMount(){
    document.querySelector(".searchPane").scrollTop = 0
    let playPreLoadIcon = document.createElement("i")
    playPreLoadIcon.className = "far fa-play-circle is-hidden"
    let pausePreLoadIcon = document.createElement("i")
    pausePreLoadIcon.className = "far fa-pause-circle is-hidden"
    document.body.appendChild(playPreLoadIcon,pausePreLoadIcon)
  }

  showFavs(){
    this.setState({favsShowing: !this.state.favsShowing,favs: window.favs.getFavs()})
    this.props.fetchJsonAgain("givemeanupdatepleaseupal")
  }

  bindFavs(){
    this.setState({favsBinder: window.favs.getFavs()})
  }

  render() {
    return (
      <div style={styles.container}>
      {this.props.feed ? 
      <TopNav 
        feed={this.props.feed} 
        searhPaneToggler={this.searhPaneToggler} 
        active={this.state.searchPaneIsActive} 
        value={this.state.query} 
        search={this.search} 
        showFavs={this.showFavs}/>: null}    
        <div className="columns is-mobile is-gapless" style={{minHeight: "100vh", marginBottom: 0}}>
          {this.props.feed ? <Background feed={this.props.feed}/> : null} 
            {/*We show an album cover from the top 5 albums gotten from the api file ## fix: reTaking background couse of functional component re-rendering*/}
            <div className="column is-7 titles-container" style={{...styles.flexy,flexDirection: "column", backgroundColor: "rgba(10,10,10,0.95)"}}>
              <h1 className="subtitle is-1 has-text-grey-light has-text-centered monoton-font" style={{marginBottom: 0,...styles.fadeIn}}>
                TOP<span style={styles.entranceText}><span style={styles.orangeOne} className="has-text-warning">100</span><span style={{marginTop: "-0.8rem"}} className="has-text-primary">of</span></span>ITUNES
              </h1>
              <h2 className="intro-animated has-text-grey">
                rock n rolling, showin' u the best pals!
              </h2>
            </div>
          {this.props.feed ? 
          <LeftPane 
            feed={this.props.feed} 
            active={this.state.searchPaneIsActive} 
            bindFavs={this.bindFavs}/> : null}
        </div>
        {this.state.favsShowing ? 
        <Favs 
          feed={this.props.feed} 
          favs={this.state.favs} 
          favsBinder={this.state.favsBinder}
          showFavs={this.showFavs}
          bindFavs={this.bindFavs}/> : null}
      </div>
    )
  }
}

export default Container