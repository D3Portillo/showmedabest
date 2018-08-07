import React, { Component } from 'react'
import ItemBox from "./ItemBox"
import Modal from "./Modal"
import styles from "../assets/js/styles"

class LeftPane extends Component{
  constructor(props){
    super(props)
    this.state = {modalIsActive : false, showingTracks: false, modalData:{title:"", cover:"",href:"" , albumId: "", price: "", releaseDate: ""}}
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.showTracks = this.showTracks.bind(this)
  }

  componentDidMount(){
    window.addEventListener("resize", _=>{
      if(window.innerWidth<769){
        this.hideModal()
      }
    })
  }
  
  showModal(title,cover,href,albumId, price,releaseDate){
    this.setState({modalIsActive : true, modalData:{title: title, cover: cover, href: href, albumId: albumId, price: price, releaseDate: releaseDate}})
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
      this.props.feed.length>0?
      Object.keys(this.props.feed).map(e=>{
        let feed = this.props.feed[e][0]
        let albumId = feed["id"]["attributes"]["im:id"]
        return <ItemBox  
          name={feed["im:name"]["label"]} 
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
          favId={window.favs.hasFav(albumId) ? albumId : false} 
          bindFavs={this.props.bindFavs}/>
      }) :<div className="itemBox has-text-centered">
            Sorry, but I couln't find the album you're looking for <i className="fas fa-sad-cry is-size-5"></i>
          </div>
      }
      </div>
      {this.state.modalIsActive ?
        <Modal 
          active={this.state.modalIsActive} 
          showTracks={this.showTracks} 
          showingTracks={this.state.showingTracks}
          data={this.state.modalData}
          hideModal={this.hideModal}/> : null}
    </div>
    )
  }
}

export default LeftPane