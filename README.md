# Showmedabest

```javascript
Project Structure

|-public
|-|-manifest.json
|-|-logo.svg
|-|-index.html
|-src
|-|-assets
|-|-|-img
|-|-|-css
|-|-|-js
|-|-views
|-|-|-Container.js
|-|-|-LeftPane.js
|-|-|-TrackList.js
|-|-|-TopNav.js
|-|-|-Loader.js
|-|-index.js
|-|-registerServiceWorker.js
|-|-cookies.js

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

You can type #20 or simply 20 , to get that album pos name and artist.

Btw you can also search either by artist or album name, title., also you can take a look at the tracks the album has and listen a lil preview of it.

You can also take a look at the album price and its cover pic, another thing out there is that you can add up one album to your fav's list, then you can manage them tappin' on the heart like icon

## About the app and its code

Of course the app is not finished, need to be pulished , there are some marked sections with hashes "#" that might be needing a lil upgrade

Star this up, you don't lose a thing doing so