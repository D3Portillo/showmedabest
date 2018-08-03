import React, { Component } from 'react'
import styles from "../assets/js/styles"

class Background extends Component {
    constructor(props){
        super(props)
        this.state = {backgroundImage: false}
    }

    componentDidMount(){
        this.setState({backgroundImage : this.props.feed.length>4 ? 
            this.props.feed[Math.round(Math.random()*4)][0]["im:image"][2]["label"] : ""})
    }
    render(){
        return(
        <div className="shower column is-7" style={{...styles.shower,backgroundImage: `url(${this.state.backgroundImage})`}}></div>)
    }
}

export default Background