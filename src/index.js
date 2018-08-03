import React from 'react'
import ReactDOM from 'react-dom'
import Loader from "./views/Loader"
import logo from "./assets/img/logo.svg"
import "./assets/css/index.css"
import registerServiceWorker from './registerServiceWorker'
import "./cookies"

ReactDOM.render(<Loader logo={logo}/>, document.getElementById('root'))
registerServiceWorker()