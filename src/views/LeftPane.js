import React, { Component } from 'react'
import ItemBox from "./ItemBox"
import styles from "../assets/js/styles"

class LeftPane extends Component{
    constructor(props){
        super(props)
        this.state = {feed : props.feed}
        console.log(props.feed)
    }

    render(){
        let feed = this.state.feed["feed"]["entry"]
        return(
            <div className="column is-5" style={styles.pane}>
                <div style={{paddingTop: "4rem"}}>
                    {
                        Object.keys(feed).map(e=><ItemBox name={feed[e]["im:name"]["label"]} artist={feed[e]["im:artist"]["label"]} key={e} pos={e}/>)
                    }
                </div>
            </div>
        )
    }
}

export default LeftPane