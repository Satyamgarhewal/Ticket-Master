import React from 'react'
import {Link} from 'react-router-dom'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import axios from '../../config/axios'
import Form from './Form'

export default class EmployeeList extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[],
            department:[],
            filterEmployees:[],
            search:""
        }
    }
    componentDidMount(){
        axios.get('/employees/list',{
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log('axios success')
            console.log(response.data)
            const employees= response.data
            this.setState({employees, filterEmployees:employees})
        })
        .catch(err=>{
            console.log(err)
        }) 
    }
    handleDelete=e=>{
        const confirm= window.confirm('Are you sure?')
        if(confirm){
        console.log(e.target.value)
        const id =e.target.value
        axios.delete(`/employees/delete/${id}`, {
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
           this.setState(prevState=>({
               filterEmployees:(prevState.filterEmployees.filter(employee=>employee._id!==response.data._id))
           }))
        })
        .catch(err=>{
            console.log(err)
        })
        }
        
}
    handleEdit(id){
        console.log(id)
    }

    handleSubmit=(data)=>{
        console.log(data)
        axios.post(`/employees/register`, data,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
           if(response.data.errors){
               const errorMsg=response.data.errors.message
               this.setState(errorMsg)

           }
           else {
               window.alert('Employee added successfully')
               const employees = response.data
              
               this.setState(prevState=>({
                //    employees:[...prevState.employees,employees],
                   filterEmployees:[...prevState.filterEmployees, employees]
               }))
           }
            
        })
    }

        handleSearch=(e)=>{
            console.log(e.target.value)
            const search =e.target.value
           const filterEmployees = []
            this.state.employees.forEach(emp=>{
                if (emp.name.toLowerCase().includes(search)){
                    filterEmployees.push(emp)
                    this.setState({filterEmployees})
                }
            })
        }
    render(){
        return(
           
            

            <div className ="container">
                                <nav className="navbar navbar-dark bg-primary mb-3">
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-background-color: #e3f2fd;">


<ul className="navbar-nav">
<li className="nav-item active">
<Link to="/ticket">  <a className="navbar-brand mr-5" href="#">Home <span className="sr-only">(current)</span></a></Link>
  </li>
  <Link to="/customers">  <li className="nav-item active">
  <a className="navbar-brand mr-5" href="#">Customer <span className="sr-only">(current)</span></a>
  </li></Link>
  <Link to="/departments" ><li className="nav-item">
  <a className="navbar-brand mr-5" href="#">Department</a>
  </li></Link>
  <Link to ="/employees/list"><li className="nav-item">
   <a className="navbar-brand mr-5 " href="#">Employees</a>
  </li></Link>
 
</ul>
<form className="form-inline ml-5 ">
<input className="form-control mr-sm-2" type="search" placeholder="Search Employee" aria-label="Search"  name = "search" onKeyUp = {this.handleSearch} />
<button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
</form>

</nav>            
                </nav>
                <div className ="row">
                    <div className = "col-md-3 ">
                <h5 className = "mb-4">Listing Employees - {this.state.filterEmployees.length}</h5>
                

             <table className ="table table-bordered table-striped ">
                 <thead>
                     <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Department</th>
                        <th>Delete</th>
                        <th>Edit</th>

                     </tr>
                 </thead>
                 <tbody>
                 {this.state.filterEmployees.map((employee, index)=>{
                    return (
                        <tr key ={employee._id}>
                            <td>{index+1}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.department}</td>
                            <td><button className="btn btn-danger " onClick ={this.handleDelete} value = {employee._id}>Delete</button></td>
                            <td><button className="btn btn-warning " onClick={()=>{this.handleEdit(employee._id)}}>Edit</button></td>
                        </tr>
                    )
                })}

                 </tbody>
             </table>
             </div>
             <div className ="offset-md-6" >
                 <h5>Add Employee</h5>
             <Form handleSubmit = {this.handleSubmit} />
             </div>
             </div>
             </div>
            
          
        )
    }
}