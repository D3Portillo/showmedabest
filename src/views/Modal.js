import React from 'react'
import TrackList from "./TrackList"
import styles from "../assets/js/styles"

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
            </p>
            {<TrackList albumId={props.albumId}/>}
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

export default Modal