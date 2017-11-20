//We are navigating here from the routes in our root.jsx. If there is time, modularize the form and table 

import React, { Component } from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import {Link,NavLink} from 'react-router-dom';

export default class AllStudents extends Component{
    constructor(props) {
        super(props)
        this.state = {
            campuses:[],
            students: [],
            studentName: '',
            studentEmail: '',
            campusId: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
  componentDidMount() {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => this.setState({students}))
    .then(setStudents=>axios.get('/api/campuses'))
    .then(res=>res.data)
    .then(campuses=>this.setState({campuses}))
    .catch(console.log)
  }


  handleSubmit(ev){
    
    // console.log("NEW STUDENT TO SUBMIT", this.state.newStudent)
    ev.preventDefault();
    axios.post('api/students',
    {name: this.state.studentName,
        email: this.state.studentEmail,
        campusId: this.state.campusId
      })
    .then(response => {
      console.log('SAVE SUCESSFUL', response.data)
      console.log('NEW STATE STUDENTS', this.state)
      // this.setState({newCampus: ""})
      this.setState({students: [...this.state.students, response.data],
        studentName: '',
        studentEmail:'',
        campusId:'',
        })
    })
    .catch(console.log)
  }


  handleChange(ev){
    console.log("Target Name",ev.target.name,"Target Change",ev.target.value)
    console.log(this.state)
    let n = ev.target.name
    this.setState({[n]: ev.target.value})
  }
  

    render(){
        const students = this.state.students
        console.log("STATE", this.state)
        // console.log("PROPS",this.props)
        // console.log(this.state.campuses)
        // const filterObj = this.state.campuses.filter(campus=>(+campus.id===4))
        // const singleObj =filterObj[0]
        // const singleObjName=singleObj.name
        // console.log("FILTEROBJ",filterObj)
        // if(singleObj) console.log("Single",singleObj.name)

        const optionTag = function(){
          <select name="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
        }


        return (
            <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="studentName"
                  value ={this.state.studentName}
                  placeholder = "Enter Student Name"
                  onChange={this.handleChange} />
                <br />

                <input
                type="text"
                name="studentEmail"
                value ={this.state.studentEmail}
                placeholder = "Enter Student Email"
                onChange={this.handleChange} />
              <br />
              <select onChange={(ev)=>this.setState({campusId: Number(ev.target.value)})}>
              <option>Please Select Campus</option>
              {
                this.state.campuses.map(
                  campus=><option key={campus.id} 
                  name="campusId" 
                  value={campus.id}
                  >{campus.name}</option>
                )
              }
              </select>
            <br />
            <input type="submit" />
              </div>
            </form>

            <br />
            <Table style ={{backgroundColor: 'grey'}}>
            <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Campus</th>
            </tr>
          </thead>
          <tbody>
              {
                students.map(student => {
                  const temp = this.state.campuses.filter(campus => campus.id === student.campusId)[0]
                  return (
                  
                    
                    <tr key={student.id}>
                    <td><Link to = {`/students/${student.id}`}>{student.id}</Link></td>
                    <td><Link to = {`/students/${student.id}`}>{student.name}</Link></td>
                    <td><Link to = {`/students/${student.id}`}>{student.email}</Link></td>
                    <td>{
                      this.state.campuses.length > 0 ?
                       <div>{temp ? temp.name : 'Student needs to be assigned to campus'}</div>
                      : <div />
                    }
                    </td>
                      
                     
                  </tr>
                 
                )
              })
              }
           </tbody>
           </Table>
          </div>
          )

    }
}

