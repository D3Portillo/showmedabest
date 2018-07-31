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
        <div className="columns is-mobile is-gapless">
          <div className="column is-7" style={{...styles.flexy,flexDirection: "column"}}>
            <h1 className="subtitle is-1 has-text-grey-light has-text-centered">
              TOP 100 at iTunes
            </h1>
            <h2 className="subtitlehas-text-centered">
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