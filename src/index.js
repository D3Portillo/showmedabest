import React from 'react'
import ReactDOM from 'react-dom'
import Loader from "./views/Loader"
import logo from "./assets/img/logo.svg"
import registerServiceWorker from './registerServiceWorker'
import "./cookies"
import "./assets/css/index.css"

window.onload =_=>ReactDOM.render(<Loader logo={logo}/>, document.getElementById('root'))
registerServiceWorker()