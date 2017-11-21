import React from 'react';


export default (props)=>{
  const campuses = props.campuses
  const temp = props.temp
  const student = props.student
  const handleDropDownChange = props.handleDropDownChange
  // console.log( 'temp,', temp)
  // console.log('campuses', campuses)
  // console.log('SELECTED STUDENT',student)
  // console.log("DropDownProps",props)
  // console.log(handleDropDownChange)
    return(
        <form onClick={()=>console.log('SELECTED STUDENT', student)} style={{color: 'black'}}>
        <select onChange={(ev)=>handleDropDownChange(ev, student)}>
        <option>
        {temp ? temp.name : 'Student needs to be assigned to campus'}
        </option>
          {
            campuses.map(
              campus=><option key={campus.id} 
              name="campusId" 
              value={campus.id}
              >{campus.name}</option>
            )
          }
      </select>
        </form>
    )
}