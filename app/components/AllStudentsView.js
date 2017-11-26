//We are navigating here from the routes in our root.jsx. If there is time, modularize the form and table 

import React, { Component } from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import {Link,NavLink} from 'react-router-dom';
import {Dropdown} from './index';

export default class AllStudents extends Component{
    constructor(props) {
        super(props)
        this.state = {
            campuses:[],
            students: [],
            studentName: '',
            studentEmail: '',
            campusId: '',
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDropDownChange=this.handleDropDownChange.bind(this);
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
   handleDropDownChange(ev,student){
    ev.preventDefault();
    console.log(student)
    console.log(ev.target.value)
    axios.put(`api/students/${student.id}`,{
      name: student.name,
      email: student.email,
      campusId: ev.target.value
    })
    .then(response=>console.log(response))
  }


  // handleDropDownClick(evt){
  //   evt.preventDefault();
  //   console.log(" Clicked")
  // }

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

    

        return (
          <div>
          <h1 style={{color: 'red',
                      marginTop: '-60px',
                      marginBottom: '60px'}}>All Students
                      </h1>
           
            <div id='hello'>
            <Table className= 'allStudentsTable'>
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
                      <Dropdown campuses={this.state.campuses}
                                temp ={temp}
                                student={student}
                                handleDropDownChange={this.handleDropDownChange}/>
                    }</td>
                     
                  </tr>
                 
                )
              })
              }
           </tbody>
           </Table>
            {/*ENTER NEW STUDENT FORM*/}
           <form onSubmit={this.handleSubmit} id='asvStudentInputForm'>
              <h4 style={{color:'red'}}>Enter a New Student</h4>
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
           
         </form>
         </div>
        </div>
          )

    }
}

