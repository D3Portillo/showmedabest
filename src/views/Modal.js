import React from 'react'
import TrackList from "./TrackList"
import styles from "../assets/js/styles"

const Modal = props=>{
  let hideModal = props.hideModal
  let data = props.data
  return(
    <div className="modal is-active" style={styles.fadeIn}>
    <div className="modal-background" onClick={hideModal}></div>
      <div className="modal-content" style={{maxWidth:"420px", borderRadius:"4px", overflowX: "hidden"}}>
        <div className="card">
          {!props.showingTracks ? 
          <div className="card-content">
            <p className="title has-text-black">
              {data.title}
            </p>
            <img src={data.cover} alt="" style={{display: "block",minWidth: "320px", margin: "0 auto", ...styles.fadeIn}}/>
            <p className="has-text-centered help">
              Released <b>{data.releaseDate}</b>
            </p>
          </div>:
          <div className="card-content">
            <p className="title has-text-black">
              {data.title}
            </p>
            {<TrackList albumId={data.albumId}/>}
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
            <a href={data.href} target="_blank" className="card-footer-item has-text-dark">
              Buy for {data.price}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal