import React, { Component } from 'react';


export default function AllCampuses(props){
    console.log("Props",props)
    return (
        <div className="col-xs-6  campusHead" >
          <h3 className>Campuses</h3>
          <h3>
          {
            props.campuses.map(campus => (
              <div key={campus.id}>
              <a onClick={()=>{props.selectCampus(campus.id)}} href='#'>
              <h3>{campus.name}</h3>
              </a>
              </div>
            ))  
          }</h3>
        </div>
      )

}

