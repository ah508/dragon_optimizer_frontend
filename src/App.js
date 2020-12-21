import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import "./styles/App.css"
import Home from "./components/Home"
import About from "./components/About"
import FAQ from "./components/FAQ"
import DragonList from "./components/DragonList"

function App() {

  return (
    <Router >
      <div className="parent">
        <div className="blackbox"></div>
        <nav className="navbar">
          <div className="linkbox" htmlFor="home">
            <Link to="/" id="home">
              <span className="innerlink"></span>
              HOME
            </Link>
          </div>
          <div className="linkbox">
            <Link to="/app">
              <span className="innerlink"></span>
              APP
            </Link>
          </div>
          <div className="linkbox">
            <Link to="/FAQ">
              <span className="innerlink"></span>
              FAQ
            </Link>
          </div>
          <div className="linkbox">
            <Link to="/about">
              <span className="innerlink"></span>
              ABOUT
            </Link>
          </div>
          <div className="linkbox">
            <a href="https://github.com/ah508/dragon_optimizer" target="_blank" rel="noreferrer">
              <span className="innerlink"></span>
              SOURCE
            </a>
          </div>
        </nav>
        <Switch>
          <Route path="/app">
            <DragonList />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/FAQ">
            <FAQ />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
