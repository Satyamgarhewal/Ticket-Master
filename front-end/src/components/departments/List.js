import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import axios from '../../config/axios'
import DepartmentForm from './Form'
import { throwStatement } from '@babel/types'
import {Link} from 'react-router-dom'
export default class DepartmentsList extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[],
            errorMsg:'',
            filterDepartment:[],
            search:""
        }
       
    }
    componentDidMount(){
        axios.get('/departments/list',{
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log("Inside List- axios succcess")
            console.log(response.data)
            const departments=response.data
            this.setState({departments, filterDepartment:departments}, ()=>{
                console.log('filter Department', this.state.filterDepartment)
            })
            // console.log('departments-- ',this.state.departments, this.state.filterDepartment)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleSubmit=(formData)=>{
        console.log('list formData', formData)
       
        axios.post('/departments/register', formData, {
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log('axios success')
            console.log(response.data)
            const departments= response.data
            this.setState(prevState=>({
                filterDepartment:[...prevState.filterDepartment, departments]
            }))

            // if(response.data.errors)
            // {
            //    this.setState({
            //        errorMsg:(response.data.errors.name.message)
            //    })
            //    console.log(this.state.errorMsg)
            // }
            // else{
                
            //     const department=response.data
            //     this.setState(prevState=>({
            //         departments:[...prevState.departments,department]
            //     }))
            // }
            
        })
        .catch(err=>{
           console.log(err)
        })
    }
    handleDelete=(e)=>{
        const confirm = window.confirm ('Are you sure?')
    
        console.log(e.target.value)
        const id = e.target.value
        if(confirm){
            axios.delete(`/departments/delete/${id}`,{
                headers:{
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.setState(prevState=>({
                    filterDepartment:(prevState.filterDepartment.filter(dept=>dept._id!==response.data._id))
                }))
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        }
        
        // handleEdit=(id)=>{
        //     console.log('handle Edit clicked', id)
        //   const name=  window.prompt("Please Enter the new name")
        //   console.log(name)
        //   axios.put(`departments/${id}`,name, {
        //       headers:{
        //           'x-auth': localStorage.getItem('token')
        //       }
        //   })
        //   .then(response=>{
        //       console.log(response.data)
        //   })
          
        
        // }
        handleSearch=(e)=>{
          
            console.log('Inside handle Search',e.target.value)
            const search = e.target.value
           
            const filterDepartment =[]
            this.state.departments.forEach(dept=>{
                if(dept.department.toLowerCase().includes(search)){
                    filterDepartment.push(dept)
                    this.setState({filterDepartment})
                }
                else{
                    const errorMsg = "No record found"
                    // this.setState({errorMsg})
                }
            })
           
           
        
        
        }
        
    render(){
        return (
           
           

            <div className = "container">
                <div className = "row" >
                    <div className = "col-md-12">
                    <nav className="navbar navbar-dark bg-primary">
            
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
<form className="form-inline ml-5">
<input className="form-control mr-sm-2 " type="text" placeholder="Search Department" onKeyUp={this.handleSearch} aria-label="Search" />
<button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
</form>

</nav>            
                </nav>
                    </div>
                    
                </div>
                    <div className = "row mt-3 ml-2">
                   
                       
                <h5>Listing Departments - {this.state.filterDepartment.length}</h5>
                <div className = "offset-md-7 mt-1">
                  <h5>  Add Department </h5>
                </div>
                </div>
                <h3 >{this.state.errorMsg}</h3>
                         <div className ="row">
                             <div className="col-md-6">
                      <table className = "table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Department</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {
                            // const filterDepartment = this.state.filterDepartment
                            (this.state.filterDepartment)?( this.state.filterDepartment.map((department, index) =>{
                                return(
                              <tr key = {department._id}>
                                <td>{index+1}&nbsp;</td>
                                <td>{department.department}&nbsp;</td>
                                <td><button className = "btn btn-danger" onClick = {this.handleDelete} value ={department._id}>Delete</button>&nbsp;</td>
                                <td><button className = "btn btn-warning"onClick={()=>{this.handleEdit(department._id)}}>Edit</button></td>
                              </tr>
                                )
                            })):(
                                <h3></h3>
                            )

                            
                           
                        }
                        
                     
                        </tbody>
                    </table> 
                    </div>
                   
                   
                   <div className=" col-md-4 offset-md-2 ">
                <DepartmentForm handleSubmit ={this.handleSubmit} handleSearch={this.handleSearch} />
                </div>
                </div>
               
               
                  
              
            </div>
            
        )
    }
}