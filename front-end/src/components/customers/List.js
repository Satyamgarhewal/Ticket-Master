import React from 'react'
import {Link} from 'react-router-dom'
import Form from './Form'

import axios from '../../config/axios'
// import CustomersForm from './Form'
export default class CustomersList extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[],
            successMsg :'',
            filterCustomers:[],
            editable:[]

        }
       
    }

    componentDidMount(){
        axios.get('/customers/list',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(response.data)
            const customers = response.data
            this.setState({customers, filterCustomers:customers})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleSubmit=(data)=>{
        axios.post('/customers/register', data,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log('Post request success')
            if(response.data.errors){
                window.alert(response.data._message)
            }
            else{
            console.log(response.data)
           
            const customers = response.data
            this.setState(prevState=>({
                customers:[...prevState.customers, customers],
                filterCustomers: [...prevState.filterCustomers, customers]
            }))
           
            }
          
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleDelete=(e)=>{
        const confirm = window.confirm("Are you Sure?")
        if(confirm){
            console.log(e.target.value)
            const id = e.target.value
            axios.delete(`/customers/delete/${id}`,{
                headers:{
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(response=>{
              
               this.setState(prevState=>({
                   filterCustomers: prevState.filterCustomers.filter(customer=>customer._id!== response.data._id)
               }))
            })
            .catch(err=>{
                console.log(err)
            })

        }
    
    }   
    handleEdit=e=>{
       
    }
       
    
    handleSearch=e=>{
        console.log(e.target.value)
        // console.log(e.target.value)
        const search=e.target.value
        const filterCustomers=[]
        this.state.customers.forEach(cust=>{
            if(cust.name.toLowerCase().includes(search)){
                filterCustomers.push(cust)
                this.setState({filterCustomers})
            }
        })
    }

    render(){
        return( 
            <div className = "container">
                <div className = "row">
                <div className ="col-md-12">
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
    <input className="form-control mr-sm-2 " type="search" placeholder="Search Customer" onKeyUp={this.handleSearch}aria-label="Search" />
    <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
  </form>
  
</nav>            
                    </nav>
                    </div>
              
                </div>
                <div className = "row ml-1 mt-3">
                    <div className ="col-md-8 mb-3">
                <h5>Listing Customers - {this.state.filterCustomers.length}</h5>
                </div>
                <div className = "col-md-4">
                <h5>Add Customer</h5>
                </div>
                </div>
                <div className ="row ml-1">
                        <div className ="col-md-8">
                    <table >
                    <div className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.filterCustomers.map((customer,index)=>{
                           return(
                               <tr key= {customer._id}>
                                   <td>{index+1}</td>
                                   <td>{customer.name}</td>
                                   <td>{customer.email}</td>
                                   <td>{customer.mobile}</td>
                                   <td><button  className = "btn btn-danger p-2 mt-2 ml-2" onClick={this.handleDelete} value ={customer._id}>Delete</button></td>
                                   <td><button className = "btn btn-warning p-2 mt-2 ml-2" onClick={this.handleEdit=(e)=>{
                                                        // console.log(e.target.value)
                                                        const editable ='value'
                                                            this.setState(prevState=>({
                                                                editable:[...prevState.editable, editable]
                                                            }),()=>{
                                                                console.log(this.state.editable)

                                                               return(
                                                                    <div>
                                                                     {(this.state.editable.length!=0)?(
                                                                         <div className="modal-body">
                                                                     
                                                                             <h5>Popover in a modal</h5>
                                                                         
                                                                             </div>
                                                                     ):(console.log(this.state.editable))}
                                                                    </div>
                                                               )
                                                                     
                                                            })
                                                            
                                                  
                                   }}value = {customer._id}>Edit</button></td>
                               </tr>
                           )
                       })}
                    </tbody>
                    </div>
                </table>
                </div>
               
               <div className ="col-md-4">
             
                <Form handleSubmit = {this.handleSubmit} />
                </div>
                </div>
            </div>
        )
    }
}