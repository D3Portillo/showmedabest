import React,{Component} from 'react'
const request = require("request")

class TrackList extends Component{
    constructor(props){
        super(props)
        this.state = {tracks: false, loaded: false, audioArr:[]}
        this.playMe = this.playMe.bind(this)
    }

    componentDidMount(){
        request(`https://itunes.apple.com/lookup?id=${this.props.albumId}&entity=song&callback=`, (error, response, body)=> {
            console.log(JSON.parse(body),this.props.albumId)
            this.prepareJson(JSON.parse(body))
        })
    }
    
    prepareJson(json){
        let qs = []
        let audioArr = []
        for(let i=1;i<json["resultCount"] -1;++i){
            qs.push(json["results"][i]["trackName"])
            audioArr.push(new Audio(json["results"][i]["previewUrl"]))
        }
        this.setState({tracks: qs, audioArr: audioArr})
    }

    playMe(i){
        if(!this.state.audioArr[i].paused){
            this.state.audioArr[i].pause()
            this.state.audioArr[i].currentTime = 0
            document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
        }
        else{
            this.state.audioArr.forEach((e,i)=>{
                e.pause()
                e.currentTime = 0
                document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
            })
            this.state.audioArr[i].play()
            document.querySelector(".audio"+i).innerHTML = '<i class="far fa-pause-circle"></i>'
        }
    }

    render() {
        return (
        <table className="table is-fullwidth">
        <tbody>
            <th>#</th><th>Name</th><th></th>
            {this.state.tracks ? 
            this.state.tracks.map((e, i)=>
            <tr>
                <td>{1*i+1}</td>
                <td>{e}</td>
                <td>
                    <button onClick={_=>this.playMe(i)} className={"button is-light audio"+i} title="Tap to play preview">
                        <i className="far fa-play-circle"></i>
                    </button>
                </td>
            </tr>) : ""}
        </tbody>
        </table>
        )
    }
}

export default TrackList