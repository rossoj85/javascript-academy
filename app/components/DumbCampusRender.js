
//DUMMY COMPONENT WHERE WE ARE DOING OUR OF ALL CAMPUSES
import React, { Component } from 'react';
import axios from 'axios';
import {Media} from 'react-bootstrap';

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

    render(){
      console.log(" DUmb Campus Props",this.props)
      const value =this.props.value //the new campus state -Allcampus view
    return (
        <div className="col-xs-6  campusHead" >
        
        <div id='campusForm'>
          <h2 >Campuses</h2>
          <form onSubmit={this.props.handleSubmit}>
          Add a Campus {"\n"}
          <input onChange = {this.props.handleChange}type="text" value={value} ></input>
          <input type="submit" disabled={value.length<1} style={{color:'black'}}></input>
          </form>
        </div>
          <div className='campusList'>
          {
            this.props.campuses.map(campus => (
              <Media key={campus.id} className='campus'>
              <Media.Left align="top">
              <img width={64} height={64} src={campus.imageUrl} alt="placeholder thumbnail" />
            </Media.Left>
            <Media.Body>
              <Media.Heading onClick={()=>{this.props.selectCampus(campus.id)}} >
                {campus.name}
                <button className="btn btn-danger" onClick={()=>this.props.handleClick(campus.id)}>X</button>
              </Media.Heading>
              
              </Media.Body>
              </Media>
            ))  
          }
          </div>
        </div>
      )
    }
}

