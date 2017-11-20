//THis is where we are creatign the box that shows the all cmapuses. THe campuses are being rendered by a dummy component 

import React, { Component } from 'react';
import axios from 'axios';
import DumbCampusRender from './DumbCampusRender';
import StudentList from './StudentList';

export default class OldRoot extends Component {
  constructor(props) {
    super(props)
    this.state={
      campuses: [],
      selectedCampus:{},
      newCampus: ""
    }
    this.selectCampus=this.selectCampus.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleClick=this.handleClick.bind(this)
  }

  componentDidMount() {
    axios.get('/api/campuses')
    .then(res=>res.data)
    .then(campuses=>this.setState({campuses}))
    .catch(console.log)
  }

selectCampus(campusId){
  axios.get(`/api/campuses/${campusId}`)
  .then(res=>res.data)
  .then(campus=>this.setState({selectedCampus: campus}))
}

addCampus(){
  axios.post('/campuses')
}
handleSubmit(ev){
  // console.log("NEW CAMPUS", this.state.newCampus)
  ev.preventDefault()
  axios.post('api/campuses',{
    name:this.state.newCampus})
  .then(response=>{
    console.log("SAVE SUCESSFUL", response)
    console.log("NEW CAMPUSES", this.state)
    // this.setState({newCampus: ""})
    this.setState({campuses:[...this.state.campuses, response.data],
    newCampus:""})
  })
  .catch(console.log)

}

handleChange(ev){
  // console.log(this.state.newCampus)
  this.setState({newCampus: ev.target.value})
  // console.log(`INSIDE handleChange ${ev.target.value}`)
}

handleClick(campusId){
  console.log("Clicked")
  axios.delete(`api/campuses/${campusId}`)
  .then(response=>axios.get('/api/campuses')
  )
  .then(response=>response.data)
  .then(campuses=>this.setState({campuses}))
  // .then(campuses=>this.setState({campuses}))
  .catch(console.log)
}

  render() {
    console.log("INSIDE ALL CAPUS VIEW")
    // console.log("ALL CAMPUS STATE", this.state)
  //  console.log('selected Campus', this.state.selectedCampus.name)
    return (
      <div id="main">
      
    {/*
      <form onSubmit={this.handleSubmit}>
      Add a Campus {"\n"}
      <input onChange = {this.handleChange}type="text" value={this.state.newCampus} ></input>
      <input type="submit"></input>
      </form>
    */}
        <DumbCampusRender campuses={this.state.campuses} 
                          selectCampus={this.selectCampus}
                          handleClick={this.handleClick}
                          handleChange={this.handleChange}
                          handleSubmit={this.handleSubmit}
                          value={this.state.newCampus}/>
       { this.state.selectedCampus.id?
         <StudentList  campus={this.state.selectedCampus}/>
         :<div></div>
        }
      </div>
    )
  }
}