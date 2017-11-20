
// import React, { Component } from 'react';
// import axios from 'axios';
// import {Table} from 'react-bootstrap';

// export default class AllStudents extends Component{
//     constructor(props) {
//         super(props)
//         this.state = {
//             campuses:[],
//             students: [],
//             selectedStudent: {},
//             studentName: '',
//             studentEmail: '',
//             campusId: ''
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//       }
//   componentDidMount() {
//     axios.get('/api/students')
//     .then(res => res.data)
//     .then(students => this.setState({students}))
//     .catch(console.log)
//   }
//   handleSubmit(ev){
//     // console.log("NEW STUDENT TO SUBMIT", this.state.newStudent)
//     ev.preventDefault();
//     axios.put(`api/students/${studentId}`,
//     {name: this.state.studentName,
//         email: this.state.studentEmail,
//         campusId: this.state.campusId
//       })
//     .then(response => {
//       console.log('SAVE SUCESSFUL', response.data)
//       console.log('NEW STATE STUDENTS', this.state)
//       // this.setState({newCampus: ""})
//       this.setState({students: [...this.state.students, response.data],
//         newStudent: {}
//         })
//     })
//     // .then(response=>this.setState({newStudent:{}}))
//     .catch(console.log)

//   }


//   handleChange(ev){
//     // console.log("Target Name",ev.target.name,"Target Change",ev.target.value)
//     console.log(this.state)
//     let n = ev.target.name
//     console.log('nnnn', n)
//     this.setState({[n]: ev.target.value})
//   }


//     render(){
//         const students = this.state.students


//         return (
//             <div>
//             <form onSubmit={this.handleSubmit}>
//               <div>
//                 <input
//                   type="text"
//                   name="studentName"
//                   value ={this.state.studentName}
//                   placeholder = "Enter Student Name"
//                   onChange={this.handleChange} />
//                 <br />

//                 <input
//                 type="text"
//                 name="studentEmail"
//                 value ={this.state.studentEmail}
//                 placeholder = "Enter Student Email"
//                 onChange={this.handleChange} />
//               <br />

//               <input
//               type="text"
//               name="campusId"
//               value ={this.state.campusId}
//               placeholder = "Enter Campus ID"
//               onChange={this.handleChange} />
//             <br />
//             <input type="submit" />
//               </div>
//             </form>
//           </div>
//           )

//     }
// }