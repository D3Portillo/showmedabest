import React, { Component } from 'react'
import Container from "./Container"
import "../assets/css/Loader.css"
const request = require("request")

class Loader extends Component {
  constructor(props){
    super(props)
    this.state = {loaded: false, feed: false, jsonBackUp:false}
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
    query = query.replace(/#|[^a-zA-Z0-9 -']/gi, "").trim()
    //We clean the regex to alphanumeric + some symbols only
    let qs = Object.keys(this.state.jsonBackUp).filter(e=>
      this.state.jsonBackUp[e][0]["title"]["label"].toLowerCase().match(query.toLowerCase()) || 
      this.state.jsonBackUp[e][1]==query-1).map(e=>[this.state.jsonBackUp[e][0],this.state.jsonBackUp[e][1]])
    //for each element we filter them matching each of em with the query string , then we map the returned array with each values catched from the api , in this case we match album title or arstist name --> update: title contains artist, so skipped
    //btw we use a backup like db for keeping iterating it any time we want, it can be boosted  with some data structure algorithm but 100 data is comming, by now
    this.setState({feed: qs}) // at the end we set the new state of feed to the result array
  }

  prerareArray(){
    let qs = Object.keys(this.state.feed).map(e=>[this.state.feed[e],e])
    this.setState({feed: qs, jsonBackUp: qs})
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
          </div>
        </div> : <Container feed={this.state.feed} fetchJsonAgain={this.fetchJsonAgain}/>
      }
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