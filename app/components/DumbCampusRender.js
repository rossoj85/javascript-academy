
//DUMMY COMPONENT WHERE WE ARE DOING OUR OF ALL CAMPUSES

import React, { Component } from 'react';
import axios from 'axios';

export default class AllCampuses extends Component {
    //change all props to this.props we also now need a constructor 
   

    constructor(props) {
      super(props)
      this.state={
        campuses: this.props.campuses,
        selectedCampus:{},
        newCampus:{}
      }
     
    }

  //   componentWillReceiveProps(nextProps){
  //     console.log('nextprops', nextProps);
  //     console.log('old props', this.props);
  //     if (this.props.campuses.length !== nextProps.campuses.length) {
  //         this.setState({campuses: nextProps.campuses});
  //     }
  // }
// handleClick(campusId){
//   console.log("Clicked")
//   axios.delete(`api/campuses/${campusId}`)
//   .then(response=>{
//     axios.get('/api/campuses')
//   })
//   .then(campuses=>this.setState({campuses}))
//   .catch(console.log)
// }
    render(){
      console.log(" DUmb Campus Props",this.props)
      
    return (
        <div className="col-xs-6  campusHead" >
        
          <h3 className>Campuses</h3>

          <form onSubmit={this.props.handleSubmit}>
          Add a Campus {"\n"}
          <input onChange = {this.props.handleChange}type="text" value={this.props.value} ></input>
          <input type="submit"></input>
          </form>

          <h3>
          {
            this.props.campuses.map(campus => (
              <div key={campus.id}>
              
              <a onClick={()=>{this.props.selectCampus(campus.id)}} href='#'>
              <h3>{campus.name}</h3>
              </a>
              <button className="btn btn-danger" onClick={()=>this.props.handleClick(campus.id)}>X</button>
              
              </div>
            ))  
          }</h3>
        </div>
      )
    }
}

