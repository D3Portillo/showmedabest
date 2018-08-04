import React, { Component } from 'react'
import styles from "../assets/js/styles"
import TopNav from "./TopNav"
import LeftPane from "./LeftPane"
import ItemBox from "./ItemBox"
import Background from "./Background"

class Container extends Component {
  constructor(props){
    super(props)
    this.state  = {searchPaneIsActive: false, query:"", favsShowing: false, favs:[""], favsBinder: window.favs.getFavs()}
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
      <TopNav feed={this.props.feed} searhPaneToggler={this.searhPaneToggler} active={this.state.searchPaneIsActive} value={this.state.query} search={this.search} showFavs={this.showFavs}/>: null}    
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
          {this.props.feed ? <LeftPane feed={this.props.feed} active={this.state.searchPaneIsActive} bindFavs={this.bindFavs}/> : null}
        </div>
        <div style={styles.fadeIn} className={"modal "+(this.state.favsShowing ? "is-active" : "")}>
          <div className="modal-background" onClick={this.showFavs}></div>
            <div className="modal-content" style={{borderRadius: "4px", maxWidth: "420px"}}>
              <div className="card has-background-white">
              <div className="card-content">
                <h1 className="subtitle is-2 has-text-dark has-text-centered">
                  Your favorite albums
                </h1>
                {
                  this.state.favs!=0 && this.state.favsBinder!=""? Object.keys(this.props.feed).filter(e=>window.favs.hasFav(this.props.feed[e][0]["id"]["attributes"]["im:id"])).map(e=>{
                    let feed = this.props.feed[e][0]
                    return <ItemBox name={feed["im:name"]["label"]} 
                      artist={feed["im:artist"]["label"]} 
                      key={e} 
                      pos={this.props.feed[e][1]} 
                      cover={feed["im:image"][2]["label"]} 
                      href={feed["link"]["attributes"]["href"]} 
                      showModal={false} 
                      albumId={feed["id"]["attributes"]["im:id"]}
                      price={feed["im:price"]["label"]} 
                      title={feed["title"]["label"]}
                      favId={feed["id"]["attributes"]["im:id"]} forcedFont={true} bindFavs={this.bindFavs}/>
                  }): 
                  <p className="has-text-centered" style={{padding: "1rem 0.5rem"}}>
                    Empty, please add some songs tappin' the heart on them, dont be that bad! :3
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Container