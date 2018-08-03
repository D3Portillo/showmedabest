import React,{Component} from 'react'

window.dataOn = (data)=>{
  window.prepareJson(data)
  //we call this function from TrackList Class
}
//We bind data to a script tag thus we avoid cors Error from the itunes api

class TrackList extends Component{
  constructor(props){
    super(props)
    this.state = {tracks: false, loaded: false, audioArr:[]}
    this.playMe = this.playMe.bind(this)
    this.prepareJson = this.prepareJson.bind(this)
    window.prepareJson = this.prepareJson
    //Giving global acces attaching the function to "window" after binding it's class
  }

  componentDidMount(){
    let script = document.createElement("script")
    script.src = `https://itunes.apple.com/lookup?id=${this.props.albumId}&entity=song&callback=dataOn`
    //we create a script tag and give the api request as it's content url
    document.querySelector(".scriptsContainer").innerHTML = ""
    //cleaning up container
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
    //we create to arrays one holding  tracknames and another one holdingg it's audio Preview
  }

  componentWillUnmount(){
    this.state.audioArr.forEach((e,i)=>{
      e.pause()
      e.currentTime = 0
    })
    //We gotta pause and clear em'
  }

  playMe(i){
    let au = this.state.audioArr
    if(!au[i].paused){
      au[i].pause()
      au[i].currentTime = 0
      document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
      //if same element is tapped we stop it avoiding the array iterations, could be upgraded ###########################################
    }
    else{
      au.forEach((e,i)=>{
        e.pause()
        e.currentTime = 0
        document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
        //pause any possibly playing element and restore it's icon
      })
      au[i].play()
      au[i].onended=_=>{
        document.querySelector(".audio"+i).innerHTML = '<i class="far fa-play-circle"></i>'
        //We add a listenter to the playing element so when music ends it's icon changes back
      }
      document.querySelector(".audio"+i).innerHTML = '<i class="far fa-pause-circle"></i>'
      //finally we change the playing item icon 
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
                <button onClick={_=>this.playMe(i)} className={"button is-primary  is-outlined audio"+i} title="Tap to play preview">
                  {/*Plays preview at it's index 'i'*/}
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