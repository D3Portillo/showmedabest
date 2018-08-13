import React from 'react'
import styles from "../assets/js/styles"
import ItemBox from "./ItemBox"

const Favs = props =>
<div style={styles.fadeIn} className="modal is-active">
<div className="modal-background" onClick={props.showFavs}></div>
  <div className="modal-content" style={{borderRadius: "4px", maxWidth: "420px"}}>
    <div className="card has-background-white">
    <div className="card-content">
      <h1 className="subtitle is-2 has-text-dark has-text-centered">
        Your favorite albums
      </h1>
      {
        props.favs && props.favsBinder!=""? 
        Object.keys(props.feed).filter(e=>
          window.favs.hasFav(props.feed[e][0]["id"]["attributes"]["im:id"])).map(e=>{
            let feed = props.feed[e][0]
            return <ItemBox 
              name={feed["im:name"]["label"]} 
              artist={feed["im:artist"]["label"]} 
              key={e} 
              pos={props.feed[e][1]} 
              cover={feed["im:image"][2]["label"]} 
              href={feed["link"]["attributes"]["href"]} 
              albumId={feed["id"]["attributes"]["im:id"]}
              price={feed["im:price"]["label"]} 
              title={feed["title"]["label"]}
              favId={feed["id"]["attributes"]["im:id"]} 
              bindFavs={props.bindFavs}
              favsMode={true}/>
        }): 
        <p className="has-text-centered" style={{padding: "1rem 0.5rem"}}>
          Empty, please add some songs tappin' the heart on them, dont be that bad! :3
        </p>
      }
    </div>
  </div>
</div>
</div>

export default Favs