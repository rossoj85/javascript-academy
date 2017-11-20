//OUR HOME PAGE
import React, { Component } from 'react';
// import DumbCampusRender from './DumbCampusRender';
import { AllCampusView, DumbCampusRender, Navbar } from './index';
import {HashRouter as Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router-dom';
import AllStudentsView from './AllStudentsView'
import SingleStudentView from './SingleStudentView'

export default class Root extends Component {

  render() {
    return (
      <Router history={hashHistory}>
      <div id="main">
        {/*<Container />*/}
        <Navbar />
        <Route exact path='/' component={AllCampusView}/>
        <Route exact path="/students" component={AllStudentsView} />
        <Route  exact path='/students/:id' component={SingleStudentView} />
        {/*}
        <Route exact path= '/campuses/:id' component={newStudentList} changes? listening?hello/>
    */}
      </div>
      </Router>
    )
  }
}



const Nav = () => (
  <div>
    <button><Link to="/">Campus View</Link></button>&nbsp;
    <button><Link to="/students">Student View </Link></button>
  </div>
)

// const Container = (props) => (<div>
// <Nav />
// {props.children}
// </div>)
