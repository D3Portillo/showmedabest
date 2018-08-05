# Showmedabest

```
Project Structure:

showmedabest
public
|--manifest.json
|  |--logo.svg
|  |-index.html
|--src
|  |--assets
|  |  |--img
|  |  |--css
|  |  |--js
|  |--views
|  |  |--Background.js
|  |  |--Container.js
|  |  |--LeftPane.js
|  |  |--TrackList.js
|  |  |--ItemBox.js
|  |  |--TopNav.js
|  |  |--Loader.js
|--index.js
|--registerServiceWorker.js
|--cookies.js

```

> index.js src loads first to start data and serves as entry point, Loader shows up an spinner while it fetches data from the api, when done it mounts the container component , which contains mainly the whole coding and logic of app.

> The project was intialized using the barebones from the node package ["create-react-app"](https://github.com/facebook/create-react-app) from facebook, then updated as needed.

## Frameworks and stuff used [out of create-react-app]
- [Bulma](https://bulma.io/)
- [Browser Cookies](https://www.npmjs.com/package/browser-cookies)
- [Fontawesome](https://fontawesome.com/)
- [Animate](https://daneden.github.io/animate.css/)
> And Web APIs

## User Story

In the app you can search from the top 100 of albums from itunes, using its API.
> PD: Sometimes <100 , it's couse of the API

You can type #20 to grab that element from the list showing it's name and artist, if you only type ie: 19 , the result will be taken based on it's title , putting that query could be 1900's or idk.

Btw you can also search either by artist or album name, title., also you can take a look at the tracks the album has and listen a lil preview of it.

You can also take a look at the album price and its cover pic, another thing out there is that you can add up one album to your fav's list, then you can manage them tappin' on the heart like icon

## How to host

first you need [NodeJS](https://nodejs.org/es/), then if you are on linux you gotta install git, if installed then copy this 
```
git clone https://github.com/D3Portillo/showmedabest.git
```
when cloned  type
```
cd showmedabest
```
then you gotta install all modules needed so
```
npm install
```
if all done then we can start the app, hoping no bugs comming ;'c
```
npm start
```
if you are on windows you can use the git cmd , fetch it [here](https://gitforwindows.org/)
and type all the above code

## About the app and its code

Of course the app is not finished, need to be pulished , there are some marked sections with hashes "#" that might be needing a lil upgrade

Star this up, you don't lose a thing doing so
