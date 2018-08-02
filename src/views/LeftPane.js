import React, { Component } from 'react'
import ItemBox from "./ItemBox"
import styles from "../assets/js/styles"

class LeftPane extends Component{
    constructor(props){
        super(props)
        this.state = {modalIsActive : false, name:"", artist:"", cover:"",href:""}
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    showModal(name,artist,cover,href){
        this.setState({modalIsActive : true, name: name, artist: artist, cover: cover,href: href})
        document.querySelector(".searchPane").classList.add("noOverFlow")
    }

    hideModal(){
        this.setState({modalIsActive : false})
        document.querySelector(".searchPane").classList.remove("noOverFlow")
    }

    render(){
        return(
        <div className={"column has-background-black is-5 searchPane " + (this.props.active ? "active" : "")} style={styles.pane}>
            <div className="column is-8 is-offset-2">
            {
            this.props.feed ? //hoping we are avoiding falsy values here
            Object.keys(this.props.feed).map(e=>
                <ItemBox  name={this.props.feed[e][0]["im:name"]["label"]} 
                artist={this.props.feed[e][0]["im:artist"]["label"]} key={e} 
                pos={this.props.feed[e][1]} cover={this.props.feed[e][0]["im:image"][2]["label"]} 
                href={this.props.feed[e][0]["link"]["attributes"]["href"]} showModal={this.showModal}/>) : ""
            }
            </div>
    {this.state.modalIsActive ? <Modal active={this.state.modalIsActive} name={this.state.name} artist={this.state.artist} cover={this.state.cover} href={this.state.href} hideModal={this.hideModal}/> : ""}
        </div>
        )
    }
}

const Modal = props=>{
    return(
        <div className="modal is-active">
        <div className="modal-background" onClick={props.hideModal}></div>
            <div className="modal-content" style={{maxWidth:"420px", borderRadius:"4px"}}>
                <div className="card">
                    <div className="card-content">
                        <p className="title has-text-black">
                        {props.name}
                        </p>
                        <p className="subtitle">
                        {props.artist}
                        </p>
                        <img src={props.cover} alt="" style={{display: "block",minWidth: "320px", margin: "0 auto"}}/>
                    </div>
                    <div className="card-footer">
                        <a className="card-footer-item">
                            View Tracks
                        </a>
                        <a href={props.href} target="_blank" className="card-footer-item">
                            Buy at Itunes
                        </a>
                    </div>
                </div>
            </div>
        </div>
      )
}
export default LeftPane