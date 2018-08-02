import React, { Component } from 'react'
import ItemBox from "./ItemBox"
import TrackList from "./TrackList"
import styles from "../assets/js/styles"

class LeftPane extends Component{
    constructor(props){
        super(props)
        this.state = {modalIsActive : false, name:"", artist:"", cover:"",href:"" , showingTracks: false, albumId: "", price: ""}
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.showTracks = this.showTracks.bind(this)
    }

    showModal(name,artist,cover,href,albumId, price){
        this.setState({modalIsActive : true, name: name, artist: artist, cover: cover, href: href, albumId: albumId, price: price})
        document.querySelector(".searchPane").classList.add("noOverFlow")
        document.querySelector(".topNav").classList.add("modalUp")
    }

    hideModal(){
        this.setState({modalIsActive : false, showingTracks: false})
        document.querySelector(".searchPane").classList.remove("noOverFlow")
        document.querySelector(".topNav").classList.remove("modalUp")
    }

    showTracks(){
        this.setState({showingTracks : !this.state.showingTracks})
    }

    render(){
        return(
        <div className={"column has-background-black is-5 searchPane " + (this.props.active ? "active" : "")} style={{...styles.pane,...styles.fadeIn}}>
            <div className="column is-8 is-offset-2">
            {
            this.props.feed ? //hoping we are avoiding falsy values here
            Object.keys(this.props.feed).map(e=>
                <ItemBox  name={this.props.feed[e][0]["im:name"]["label"]} 
                artist={this.props.feed[e][0]["im:artist"]["label"]} key={e} 
                pos={this.props.feed[e][1]} cover={this.props.feed[e][0]["im:image"][2]["label"]} 
                href={this.props.feed[e][0]["link"]["attributes"]["href"]} showModal={this.showModal} 
                albumId={this.props.feed[e][0]["id"]["attributes"]["im:id"]}
                price={this.props.feed[e][0]["im:price"]["label"]}/>) : ""
            }
            </div>
    {this.state.modalIsActive ? <Modal active={this.state.modalIsActive} albumId={this.state.albumId} showTracks={this.showTracks} showingTracks={this.state.showingTracks} name={this.state.name} artist={this.state.artist} cover={this.state.cover} price={this.state.price} href={this.state.href} hideModal={this.hideModal}/> : ""}
        </div>
        )
    }
}

const Modal = props=>{
    return(
        <div className="modal is-active" style={styles.fadeIn}>
        <div className="modal-background" onClick={props.hideModal}></div>
            <div className="modal-content" style={{maxWidth:"420px", borderRadius:"4px", overflowX: "hidden"}}>
                <div className="card">
                    
                    {!props.showingTracks ? 
                    <div className="card-content">
                        <p className="title has-text-black">
                        {props.name}
                        </p>
                        <p className="subtitle">
                        {props.artist}
                        </p>
                        <img src={props.cover} alt="" style={{display: "block",minWidth: "320px", margin: "0 auto", ...styles.fadeIn}}/>
                    </div>:
                    <div className="card-content">
                        <p className="title has-text-black">
                        {props.name}
                        </p>{
                            <TrackList albumId={props.albumId}/>
                        }
                    </div>}

                       
                    <div className="card-footer">
                        {!props.showingTracks ? 
                        <a className="card-footer-item" onClick={props.showTracks}>
                            View Tracks
                        </a>:
                        <a className="card-footer-item" onClick={props.showTracks}>
                            Return
                        </a>}
                        <a href={props.href} target="_blank" className="card-footer-item">
                            Buy for {props.price}
                        </a>
                    </div>
                </div>
            </div>
        </div>
      )
}
export default LeftPane