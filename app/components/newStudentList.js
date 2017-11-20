import React, { Component } from 'react';
import axios from 'axios';


export default class StudentList extends Component{
    constructor(props){
        super (props)
        this.state={
            // selectedCampus: this.props.campus,
            students: [],
            newStudent: {},
            campusName:""
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    // componentWillReceiveProps(nextProps){
    //     console.log('nextprops', nextProps);
    //     console.log('old props', this.props);
    //     if (this.props.campus.id !== nextProps.campus.id) {
    //         this.setState({students: nextProps.campus.student});
    //     }
    // }
    componentDidMount(){
        const campusId =this.props.match.params.id;

        // console.log("CAMPUS ID",campusId)
      axios.get(`/api/campuses/${campusId}`)
      .then(res=>res.data)
    //   .then(responseData=> console.log("RESPONSE DATA",responseData))
      .then(campus=>this.setState({students: campus.student,
            campusName: campus.name}))
      .catch(console.log)
    }


    handleSubmit(ev){
        // console.log("NEW STUDENT TO SUBMIT", this.state.newStudent)
        const campusId =this.props.match.params.id;
        axios.post('api/students',
        {name:this.state.newStudent,
            campusId:campusId})
        .then(response=>{
          console.log("SAVE SUCESSFUL", response.data)
          console.log("NEW STATE STUDENTS", this.state)
          // this.setState({newCampus: ""})
          this.setState({students:[...this.state.students, response.data],
            newStudent:{},
            
            })
        })
        // .then(response=>this.setState({newStudent:{}}))
        .catch(console.log)
        
      }


    handleChange(ev){
        this.setState({newStudent: ev.target.value})
      }
    render(){
    const campus =this.state.campusName
    console.log("STUDENT LIST STATE",this.state)
    console.log("OUR STUDENT LIST PROPS",this.props)
    let count=1

    return (
        <div className="col-xs-4 studentBox" style={{backgroundColor: 'LightBlue'}}>
          <h2 className="studentsHead">{`${campus} Campus Students`}</h2>

          <form onSubmit={this.handleSubmit}>
          <h4>Add a Student</h4> 
          <input onChange = {this.handleChange} type="text" ></input>
          <input type="submit"></input>
          </form>
          <h3>
    
        {
        
            this.state.students.map(student => (
              <div key={student.name}>
              <a href='#'>
              <h3>{`${count++}. ${student.name}`}
              <button className="btn btn-danger">X</button></h3>
              </a>
              </div>
            ))  
          }</h3>
        
        </div>
      )
    }
}