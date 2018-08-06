const cookies = require("browser-cookies")
if(cookies.get("favs")==null) cookies.set("favs","",{expires: 365})
//if cookies dont exist , we create em' , they expire after a year

window.favs = {}
//we create a global object named favs

window.favs.setFav = album_id=>{
  let currentCookies = cookies.get("favs").split(" | ")
  if(currentCookies.indexOf(album_id)==-1){
    currentCookies.push(album_id)
    cookies.set("favs",currentCookies.join(" | "))
  }
   
}

window.favs.deleteFav = album_id=>{
  let currentCookies = cookies.get("favs").split(" | ")
  let i = currentCookies.indexOf(album_id)!=-1 ? currentCookies.indexOf(album_id) : false
  if(i>=0){
    currentCookies.splice(i,1)
    cookies.set("favs",currentCookies.join(" | "))
  }
}

window.favs.getFavs = _=>{
  return cookies.get("favs").split(" | ")
}

window.favs.hasFav = fav=>{
  return 1*cookies.get("favs").split(" | ").indexOf(fav) + 1
}

//we add setters and getters for cookies