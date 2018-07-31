import React, { Component } from 'react'
import styles from "../assets/js/styles"

const NormalMode=props=>{
    return(
        <div>
            <button className="button is-black has-background-spot"><i className="fas fa-heart has-text-black"></i></button>
            <button onClick={_=>props.searhPaneToggler()} className="button is-black"><i className="fas fa-search has-text-spot"></i></button>
        </div>
    )
}


const Input=props=>{
    return(
        <div className="column is-4 is-offset-4">
            <div className="field has-addons">
                        
                <div className="control is-expanded">
                    <input onInput={props.search} value={props.value} onChange={props.search} className="input is-primary has-text-spot has-background-black" type="text" placeholder="Start typing to search"/>
                </div>
                <div className="control">
                    <button onClick={_=>props.searhPaneToggler()} className="button is-primary has-text-black">
                    Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

class TopNav extends Component {
    constructor(props){
        super(props)
        this.state = {feed : props.feed, qs:{}}
    }


    render() {
        return(
            <div style={{...styles.flexy,...styles.topNav,backgroundColor: this.props.active ? "#0a0a0a" : ""}} className="topNav">
                {
                    !this.props.active ? <NormalMode searhPaneToggler={this.props.searhPaneToggler}/>
                    : <Input searhPaneToggler={this.props.searhPaneToggler} value={this.props.value} search={this.props.search}/>
                }
                
            </div>
        )
    }
}

export default TopNav