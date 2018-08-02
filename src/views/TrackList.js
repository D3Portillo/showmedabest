import React,{Component} from 'react'

window.dataOn = (data)=>{
    window.prepareJson(data)
}

class TrackList extends Component{
    constructor(props){
        super(props)
        this.state = {tracks: false, loaded: false, audioArr:[]}
        this.playMe = this.playMe.bind(this)
        this.prepareJson = this.prepareJson.bind(this)
        window.prepareJson = this.prepareJson
    }

    componentDidMount(){
        let script = document.createElement("script")
        script.src = `https://itunes.apple.com/lookup?id=${this.props.albumId}&entity=song&callback=dataOn`
        document.querySelector(".scriptsContainer").innerHTML = ""
        document.querySelector(".scriptsContainer").appendChild(script)
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
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tracks ?
                    this.state.tracks.map((e, i)=>
                        <tr key={i}>
                            <td>{1*i+1}</td>
                            <td>{e}</td>
                            <td>
                                <button onClick={_=>this.playMe(i)} className={"button is-light audio"+i} title="Tap to play preview">
                                    <i className="far fa-play-circle"></i>
                                </button>
                            </td>
                        </tr>) : null}
                </tbody>
            </table>
        )
    }
}

export default TrackList