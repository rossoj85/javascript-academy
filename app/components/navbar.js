import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap'
export default (props) => {
    
    return (
    //     <Navbar inverse collapseOnSelect>
    //     <Navbar.Header>
    //     <Navbar.Brand className='fluid'>
    //     <h1 style={{color: 'red',margin:'auto',fontSize:'30px'}}>Interplanetary Academy Of Javascript</h1>
    //   </Navbar.Brand>
    //       <Navbar.Toggle />
    //     </Navbar.Header>
    //     <Navbar.Collapse>
    //       <Nav className="navButtonDiv" pullRight>
    //       <Link to="/"><Button bsStyle="success" className='navButton'>Campus View</Button></Link>
    //       <Link to="/students"><Button bsStyle="info" className='navButton'>Student View </Button> </Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>

    <div id="navbar">
    <div className="container-fluid">
    <h1 className='col-md-8'style={{textAlign:'right',marginLeft: '60px'}}>Interplanetary Academy of JavaScript</h1>
    <div className="navButtonsDiv col-md-3">
    <Link to="/"><Button bsStyle="success" className="navButton">Campus View</Button></Link>
    <Link to="/students"><Button bsStyle="info" className="navButton">Student View </Button></Link>
    </div>
    </div> 
    
</div>
            
      );
  }