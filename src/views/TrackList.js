import React,{Component} from 'react'

window.dataOn = (data)=>{
    window.prepareJson(data)
    //we call the function at TrackList
}
//We bind data to a script tag thus we avoid cors Error from the itunes api

class TrackList extends Component{
    constructor(props){
        super(props)
        this.state = {tracks: false, loaded: false, audioArr:[]}
        this.playMe = this.playMe.bind(this)
        this.prepareJson = this.prepareJson.bind(this)
        window.prepareJson = this.prepareJson
        //Giving global acces atatching the function to window after binding its class
    }

    componentDidMount(){
        let script = document.createElement("script")
        script.src = `https://itunes.apple.com/lookup?id=${this.props.albumId}&entity=song&callback=dataOn`
        //we create a script tag and give the api request as it's content
        document.querySelector(".scriptsContainer").innerHTML = ""
        document.querySelector(".scriptsContainer").appendChild(script)
        //we append the script on a hidden div thus it gets executed and calls window.dataOn
    }
    
    prepareJson(json){
        let qs = []
        let audioArr = []
        for(let i=1;i<json["resultCount"];++i){
            qs.push(json["results"][i]["trackName"])
            audioArr.push(new Audio(json["results"][i]["previewUrl"]))
        }
        this.setState({tracks: qs, audioArr: audioArr})
    }

    componentWillUnmount(){
        this.state.audioArr.forEach((e,i)=>{
            e.pause()
            e.currentTime = 0
        })
    }

    playMe(i){
        let au = this.state.audioArr
        if(!au[i].paused){
            au[i].pause()
            au[i].currentTime = 0
            document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
        }
        else{
            au.forEach((e,i)=>{
                e.pause()
                e.currentTime = 0
                document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
            })
            au[i].play()
            au[i].onended=_=>{
                document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
            }
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