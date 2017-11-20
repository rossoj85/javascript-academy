//this is also a functional component that renders, but since it takes props, it has the ability to take in forms//


import React, { Component } from 'react';
import axios from 'axios';

export default class AllCampuses extends Component{
    constructor(props) {
        super(props)
        this.state={
          students:[], 
        }
      }
componentDidMount(){
    const campusId =this.props.match.params.id;
    console.log("CAMPUS ID",campusId)
  axios.get(`/api/campuses/${campusId}`)
  .then(res=>res.data)
  .then(campus=>this.setState({students: campus.student}))
  .catch(console.log)
}
    render(){
        console.log("CAMPUS RENDER PROPS", this.props.match.params.id)
        console.log("CAMPUS RENDER State",this.state)
        const students = this.state.students
        console.log("STUDENTS", students)
    return (
        <div>
        <h1>hellos</h1>
        <h3>
          {
            students && students.map(student => (
              <div key={student.id}>
                <div>{student.name}</div>
                <a onClick={() => {this.props.selectCampus(student.id)}} href='#'>
                  <h3>{student.name}</h3>
                </a>
                <button className="btn btn-danger">X</button>

              </div>
            ))
          }</h3>
      </div>
      )
    }
}