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
  }

  fetchJsonAgain(query){
    let qs = Object.keys(this.state.jsonBackUp).filter(e=>this.state.jsonBackUp[e][0]["title"]["label"].toLowerCase().match(query.toLowerCase()) || this.state.jsonBackUp[e][0]["im:artist"]["label"].toLowerCase().match(query.toLowerCase())).map(e=>[this.state.jsonBackUp[e][0],this.state.jsonBackUp[e][1]])
    this.setState({feed: qs})
  }

  prerareArray(){
    let qs = Object.keys(this.state.feed).map(e=>[this.state.feed[e],e])
    this.setState({feed: qs, jsonBackUp: qs})
  }

  render() {
    return (
      <div>
      {
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