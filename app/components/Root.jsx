import React, { Component } from 'react';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import StudentList from './StudentList';

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state={
      campuses: [],
      selectedCampus:{},
      newCampus:{}
    }
    this.selectCampus=this.selectCampus.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
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
  axios.post('api/campuses',{
    name:this.state.newCampus})
  .then(response=>{
    console.log("SAVE SUCESSFUL", response)
    console.log("NEW CAMPUSES", this.state)
    // this.setState({newCampus: ""})
    this.setState({campuses:[...this.state.campuses, response.data]})
  })
  .catch(console.log)

}

handleChange(ev){
  // console.log(this.state.newCampus)
  this.setState({newCampus: ev.target.value})
  // console.log(`INSIDE handleChange ${ev.target.value}`)
}

  render() {
    // console.log("new campus", this.state.newCampus)
  //  console.log('selected Campus', this.state.selectedCampus.name)
    return (
      <div id="main">
      <h1>Interplanetary Academy of JavaScript</h1>

      <form onSubmit={this.handleSubmit}>
      Add a Campus {"\n"}
      <input onChange = {this.handleChange}type="text" ></input>
      <input type="submit"></input>
      </form>
      
        <AllCampuses campuses={this.state.campuses} selectCampus={this.selectCampus}/>
       { this.state.selectedCampus.id?
         <StudentList  campus={this.state.selectedCampus}/>
         :<div></div>
        }
      </div>
    )
  }
}