import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import CustomersList from './components/customers/List'
import DepartmentsList from'./components/departments/List'
import TicketsTable from './components/home/Tickets'
import EmployeeList from './components/employees/List'
import Login from './components/Login/Login'
import Registeration from './components/Registeration/Registeration'

class App extends React.Component {
  constructor(){
    super()

    this.state={
      isUserValid:false
    }
  }

  // handleAuthenticatUser=e=>{
  //   console.log(e)
  // }
  
  render(){
  return (
    <BrowserRouter>
    
   <div className = "container">
     <div className ="row">
      <div className  = "col-md-4 offset-md-5">
     <h2> Ticket Master</h2>
     </div>

     <Route path = '/' component ={Registeration} exact ={true} />
     <Route path = "/login" component = {Login} handleAuthenticatUser ={this.handleAuthenticatUser} /> 
     <Route path="/customers"  component={CustomersList} exact={true}></Route>
     <Route path = "/departments" component={DepartmentsList}/>
    <Route path = "/employees/list" component={EmployeeList} ></Route>
    <Route path = "/ticket" component ={TicketsTable}/>
  </div>
   </div>
 
   </BrowserRouter>
  ) 
  }
}

export default App;
