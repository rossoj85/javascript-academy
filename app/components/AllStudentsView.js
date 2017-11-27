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
            campusId: null,
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDropDownChange=this.handleDropDownChange.bind(this);
      }
  componentDidMount() {
    console.log("COMPONENT MOUNTER")
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
        campusId:null,
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
    console.log("handleDropdown CHange")
    console.log(ev.target.value)
    axios.put(`api/students/${student.id}`,{
      name: student.name,
      email: student.email,
      campusId: ev.target.value
    })
    .then(response=>console.log(response))
  }

  handleDelete(studentId){
    console.log("Delete Clicked")
    if(confirm ('Are you sure woy want ot dleete this student?')){
    axios.delete(`api/students/${studentId}`)
    .then(response=>axios.get('/api/students'))
    .then(response=>response.data)
    .then(allstudents=>this.setState({students: allstudents}))
    .catch(console.log)
    }
  }

    render(){
        const students = this.state.students
        console.log("STATE", this.state)
        console.log("students on Mount",students)

        //SORTS
        //We need to make copies of array becasue sorting directly on students will mutate the array and cause 
        //unwanted behavior

        //SORT STUDENTS BY NAME
        let nameArr = [].concat(students)
        let studentsByName = nameArr.sort(function(a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        //SORT STUDENTS BY ID 
        let studentIdArr= [].concat(students)
        const studentsById = studentIdArr.sort((a,b)=> a.id-b.id)

        //SORT STUDENTS BY CAMPUS
        let campusArr = [].concat(students)
        const studentsByCampus =
        campusArr.sort((a,b)=>{
          var nameA = a.campus? a.campus.name.toUpperCase():null // ignore upper and lowercase
          var nameB = b.campus? b.campus.name.toUpperCase(): null; // ignore upper and lowercase
          console.log(nameA)
          console.log(nameB)
          return (nameA===null)-(nameB===null)|| +(nameA>nameB)||-(nameA<nameB)
          })
        console.log(students)
        console.log("studentsByName",studentsByName)
        console.log("studentsByID",studentsById)     
        console.log('studentsByCampus',studentsByCampus)   

        return (
          <div>
          <h1 style={{color: 'red',
                      marginTop: '-60px',
                      marginBottom: '60px'}}>All Students
                      </h1>
           
          <div id='buttonRow'>
          <button className='btn btn-warning' onClick={()=>this.setState({students:studentsByName})} >Sort By Name</button>
          <button className='btn btn-warning' onClick={()=>this.setState({students:studentsById})}>Sort By Id</button>
          <button className='btn btn-warning' onClick={()=>this.setState({students:studentsByCampus})}>Sort By Campus</button>
          </div>
            <div id='hello'>
            <Table className= 'allStudentsTable'>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Campus</th>
                <th>Delete Student</th>
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
                    <td><button className='btn btn-danger'
                                onClick={()=>this.handleDelete(student.id)}>x</button></td>
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
               <option value={NaN}>Please Select Campus</option>
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

