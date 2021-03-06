import React, { Component } from 'react';
import axios from 'axios';
import {Dropdown} from './index';

export default class SingleStudentView extends Component {
  constructor(props) {
    super(props)
    this.state={
      campuses: [],
      student: {},
      name: '',
      email: '',
      campusId:+''
    }
    //this.setState=this.setState.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  componentWillMount() {
    const studentId = this.props.match.params.id
    axios.get(`/api/students/${studentId}`)
    .then(res=>res.data)
    .then(student=> {
    
      this.setState({
        student,
      name: student.name,
      email: student.email,
      campusId: student.campusId
        })
      })
    .then(setSudents=>axios.get('/api/campuses'))
    .then(res=>res.data)
    .then(campuses=>this.setState({campuses}))
    .catch(console.log)
  }
  handleSubmit(ev){
    ev.preventDefault();
    console.log("**********")
    const studentId = this.props.match.params.id
    //ev.preventDefault()
    axios.put(`/api/students/${studentId}`,{
      name: this.state.name,
      email: this.state.email,
      campusId: this.state.campusId
    })
    .then(setStudent=>{
      console.log("save successful")
      this.props.history.push('/students')})
    .catch(console.log)

  }
  handleChange(ev){
    console.log("Target Name",ev.target.name,"Target Change",ev.target.value)
    console.log(this.state)
    let n = ev.target.name
    this.setState({[n]: ev.target.value})
  }
  handleDelete(studentId){
    console.log("Delete Clicked")
    if(confirm ('Are you sure woy want ot dleete this student?')){
    axios.delete(`api/students/${studentId}`)
    .then(response=>response.data)
    .then(deletedStudent=>this.props.history.push('/students'))
    .catch(console.log)
    }
  }
  render() {
   console.log("SINGLE STUDENT STATE",this.state)
   var style={color:'white'}
   var student = this.state.student
   var campuses = this.state.campuses
   const temp = campuses.filter(campus => campus.id === student.campusId)[0]
   console.log('temp', temp)
   console.log(this.state.campuses)
   console.log('Props',this.props)
    return (
    <div id="singleStudentMain">

    <form onSubmit={this.handleSubmit} id='singleStudentForm'>
      <img src={student.imageUrl} style={{width:'200px', height:'250px'}}/>
      <h3 style={{textAlign:'left', color:'red'}}>Edit Student</h3>
      <h4 style={style}>Student Id #{student.id}</h4>
      <div>

        <span style={style}>name</span>
        <input
          type="text"
          name="name"
          value = {this.state.name}
          placeholder = {this.state.name}
          onChange={this.handleChange} />
        <br />

        <span style={style}>email</span>
        <input
        type="text"
        name="email"
        value ={this.state.email}
        placeholder = {this.state.email}
        onChange={this.handleChange} />

       
      <br />
       <span style={style}>Campus</span>
       <Dropdown campuses={this.state.campuses}
       temp ={temp}
       student={student}
       handleDropDownChange={this.handleChange}/>
    <br />

    
    
    <button style={{marginBottom: '25px'}} type="submit">Submit</button>
    <br />
    <button className="btn btn-danger" 
    onClick={()=>this.handleDelete(student.id)}>Delete Student</button>
      </div>
  </form>

      </div>
    )
  }
}
