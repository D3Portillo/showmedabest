import React, { Component } from 'react'
import Container from "./Container"
import "../assets/css/Loader.css"
const request = require("request")
let feedIn = {}

class Loader extends Component {
  constructor(props){
    super(props)
    this.state = {loaded: false, logo: props.logo}
  }
  componentDidMount(){
    request("https://itunes.apple.com/us/rss/topalbums/limit=100/json", (error, response, body)=> {
      feedIn = JSON.parse(body)
    }).on("response",_=>setTimeout(_=>this.setState({loaded: true}),600))
  }


  render() {
    return (
      <div>
      {
        !this.state.loaded ? 
        <div className="hero is-fullwidth is-fullheight is-black is-flex firstOne" style={styles.container}>
          <div className="hero-body has-text-centered">
            <div className="spinner" style={styles.spinner}>
              <img src={this.state.logo} style={styles.logo} alt=""/>
            </div>
          </div>
        </div> : <Container feed={feedIn}/>
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