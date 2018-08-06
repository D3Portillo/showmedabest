import React, { Component } from 'react'
import ItemBox from "./ItemBox"
import TrackList from "./TrackList"
import styles from "../assets/js/styles"

class LeftPane extends Component{
  constructor(props){
    super(props)
    this.state = {modalIsActive : false, title:"", cover:"",href:"" , showingTracks: false, albumId: "", price: "", releaseDate: ""}
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.showTracks = this.showTracks.bind(this)
  }

  componentDidMount(){
    window.addEventListener("resize", ()=>{
      if(window.innerWidth<769){
        this.hideModal()
      }
    })
  }
  
  showModal(title,cover,href,albumId, price,releaseDate){
    this.setState({modalIsActive : true, title: title, cover: cover, href: href, albumId: albumId, price: price, releaseDate: releaseDate})
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
      this.props.feed!=0? //hoping we are avoiding falsy values here
      Object.keys(this.props.feed).map(e=>{
        let feed = this.props.feed[e][0]
        let albumId = feed["id"]["attributes"]["im:id"]
        return <ItemBox  name={feed["im:name"]["label"]} 
          artist={feed["im:artist"]["label"]} 
          key={e} 
          pos={this.props.feed[e][1]} 
          cover={feed["im:image"][2]["label"]} 
          href={feed["link"]["attributes"]["href"]} 
          showModal={this.showModal} 
          albumId={albumId}
          price={feed["im:price"]["label"]} 
          title={feed["title"]["label"]}
          releaseDate={feed["im:releaseDate"]["attributes"]["label"]}
          favId={window.favs.hasFav(albumId) ? albumId : false}  forcedFont={false} bindFavs={this.props.bindFavs}/>
      }) : <div className="itemBox has-text-centered">Sorry, but I couln't find the album you're looking for <i className="fas fa-sad-cry is-size-5"></i></div>
      }
      </div>
      {this.state.modalIsActive ? 
        <Modal active={this.state.modalIsActive} albumId={this.state.albumId} showTracks={this.showTracks} 
          showingTracks={this.state.showingTracks} title={this.state.title} cover={this.state.cover} 
          price={this.state.price} href={this.state.href} hideModal={this.hideModal} releaseDate={this.state.releaseDate}/> : ""}
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
            {props.title}
            </p>
            <img src={props.cover} alt="" style={{display: "block",minWidth: "320px", margin: "0 auto", ...styles.fadeIn}}/>
            <p className="has-text-centered help">
              Released <b>{props.releaseDate}</b>
            </p>
          </div>:
          <div className="card-content">
            <p className="title has-text-black">
            {props.title}
            </p>{
              <TrackList albumId={props.albumId}/>
            }
          </div>}
          <div className="card-footer">
            {!props.showingTracks ? 
              <a className="card-footer-item has-text-dark" onClick={props.showTracks}>
                View Tracks
              </a>:
              <a className="card-footer-item has-text-dark" onClick={props.showTracks}>
                Return
              </a>
            }
            <a href={props.href} target="_blank" className="card-footer-item has-text-dark">
              Buy for {props.price}
            </a>
          </div>
        </div>
      </div>
    </div>
    )
}
export default LeftPane