import React, { Component } from 'react'
import Container from "./Container"
import "../assets/css/Loader.css"
const request = require("request")

class Loader extends Component {
  constructor(props){
    super(props)
    this.state = {loaded: false, feed: false, jsonBackUp:false, nameFilters: [], nameIndexes: []}
    this.fetchJsonAgain = this.fetchJsonAgain.bind(this)
    this.prerareArray = this.prerareArray.bind(this)
  }
  
  componentDidMount(){
    request("https://itunes.apple.com/us/rss/topalbums/limit=100/json", (error, response, body)=> {
      this.setState({feed: JSON.parse(body)["feed"]["entry"]},_=>this.prerareArray())
    }).on("end",_=>setTimeout(_=>this.setState({loaded: true}),600))
    //fetching json file from api , hoping no errors up there,  error handler missing here ###################################
  }

  fetchJsonAgain(query){
    query = query.trim().toLowerCase().replace(/[^a-z0-9# ]/gi, "-").replace(/-+/gi,"-")
    let qs = this.state.jsonBackUp
    let copy = qs
    if(query=="givemeanupdatepleaseupal"){
      this.setState({feed: []},_=>this.setState({feed: qs}))
      return 
    }
    else if(query=="-"){
      qs = []
    }
    else if(query.length>0){
      let names = this.state.nameFilters
      qs = []
      if(!isNaN(query.substr(1)-1) && query.charAt(0)=="#"){
        let pos = query.substr(1) - 1
        if(copy[pos]){
          qs.push(copy[pos])
        }
      }
      else {
        query.replace(/#/gi,"")
        names = names.match(new RegExp(`([^||]*${query}[^||]*)`,"g"))
        let indexes = this.state.nameIndexes
        if(names!=null){
          names = names.map(e=>copy[indexes.indexOf(e)])
          qs = names
        }
      }
    }
    this.setState({feed: qs})
  }

  prerareArray(){
    let names = ""
    let indexes = []
    let feed = this.state.feed
    let qs = Object.keys(feed).map(e=>{
      names+=`||${feed[e]["title"]["label"].toLowerCase()}||`
      indexes.push(feed[e]["title"]["label"].toLowerCase())
      return [feed[e],e]})
    this.setState({feed: qs, jsonBackUp: qs, nameFilters: names, nameIndexes: indexes})
    //as we take album positioning as its index position, we gotta save the position it has to avoid any missing data ie: [elementInArray,pos]
  }

  render() {
    return (
      <div>
      {
        //we show a lil loader while loading data
        !this.state.loaded ? 
        <div className="hero is-fullwidth is-fullheight is-black is-flex firstOne" style={styles.container}>
          <div className="hero-body has-text-centered">
            <div className="spinner" style={styles.spinner}>
              <img src={this.props.logo} style={styles.logo} alt=""/>
            </div>
            <i className="far fa-play-circle is-hidden"></i>
            <i className="far fa-pause-circle is-hidden"></i>
          </div>
        </div> : <Container feed={this.state.feed} fetchJsonAgain={this.fetchJsonAgain}/>
      }
      <div className="scriptsContainer" style={{width: 0, height: 0}}></div>
      {/*Not visible, but exists in DOM*/}
      </div>
    )
  }
}

const styles = {
  container:{
    alignItems: "center",
    justifyContent: "center"
  },
  logo:{
    width: "4rem",
    height: "4rem"
  }
}

export default Loader