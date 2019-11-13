import React from 'react'
import {Link} from 'react-router-dom'
import Form from './Form'
import axios from '../../config/axios'
export default class TicketsTable extends React.Component{
    constructor(){
        super()
        this.state={    
            tickets:[],
            customers:[],
            departments:[],
            filterCustomer:[],
            filterDepartment:[],
            filterTickets:[],
            checkMsg : ''
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
      
        console.log('Inside tickets component did mount')
        axios.get('/tickets/list',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log('Inside tickets-- axios success',response.data)
            const tickets=response.data

            this.setState({tickets, filterTickets:tickets})
            
            console.log('filtered tickets', this.state.filterTickets )
        })
        .catch(err=>{
            console.log(err)
        })
      
       axios.get('/customers/list',{
           headers:{
               'x-auth':localStorage.getItem('token')
           }
       })
       .then(response=>{
           console.log('customers call',response.data)
           const customers=response.data
           this.setState({customers})
       })
       .catch(err=>{
           console.log(err)
       })
       
       axios.get('/departments/list',{
           headers:{
               'x-auth':localStorage.getItem('token')
           }
       })
       .then(response=>{
           console.log('department call',response.data)
           const departments= response.data
           this.setState({departments})
       })
       .catch(err=>{
           console.log(err)
       })

       setTimeout(function(){
       console.log('Hello')
        // console.log(this.state.departments)
       }, 2000)
     

       
    }
    handleCheck(status,id){
        console.log(id, status)
        

        
    }
    handleSubmit(formData){
        console.log('inside tickets handle Submit', formData)
        
        axios.post('/tickets/register',formData,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
           
        }).then(response=>{
            console.log('1st axios',response.data)
            axios.get('/tickets/list',{
                headers:{
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then (response=>{
                console.log('Inside Nested axios', response.data)
                const tickets = response.data
                const checkMsg ='Open'
                this.setState({tickets,filterTickets:tickets, checkMsg:checkMsg})
                
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
            const errorMsg = err.errors.message
            this.setState({errorMsg})
        })
       
    }
    handleSearch=e=>{
      console.log(e.target.value)
      const search = e.target.value
      const filterTickets = []
      this.state.tickets.forEach(ticket=>{
          if(ticket.code.toLowerCase().includes(search)){
            filterTickets.push(ticket)
          }
          this.setState({filterTickets})
      })
    }
    handleClick=e=>{
        console.log('handle click clicked')
        console.log(e.target.name, e.target.value)
        const priority = e.target.value
        const filterTickets=[]
        let tick = this.state.tickets
        console.log(tick, priority)
        
        if(priority== 'All'){
            for(let i=0; i<tick.length; i++){
                filterTickets.push(tick[i])
            }
            console.log('After push',filterTickets)
            this.setState({filterTickets})
        }
            else{
            
            for(let i=0; i<tick.length; i++){
                if (priority === tick[i].priority){
                    filterTickets.push(tick[i])
                }
            }
        
        console.log('Filtering tickets',filterTickets)
        this.setState({filterTickets})
            }
    }
    handleLogout=e=>{
        console.log('handle logout clicked')
        // const confirm= window.alert('Are you sure?')
      
            axios.delete('/users/logout',{
                headers:{
                    'x-auth':localStorage.getItem('x-auth')
                }
            } )
            .then(response=>{
                console.log(response.data)
            })
            .catch(err=>{
                console.log(err)
            })
        
       
    }
   
    render(){

        return(
            <div className="container">
                <div className = "row">
                <div className ="col-md-12 ">
                <nav className="navbar navbar-dark bg-primary">
            
                <nav className="navbar navbar-expand-lg navbar-dark bg-background-color: #e3f2fd;">
 
  
    <ul className="navbar-nav">
    <li className="nav-item active">
    <Link to="/ticket">  <a className="navbar-brand mr-5" href="#">Home <span className="sr-only">(current)</span></a></Link>
      </li>
      <li className="nav-item active">
      <Link to="/customers">  <a className="navbar-brand mr-5" href="#">Customer <span className="sr-only">(current)</span></a></Link>
      </li>
      <li className="nav-item">
      <Link to="/departments" > <a className="navbar-brand mr-5" href="#">Department</a></Link>
      </li>
      <li className="nav-item mr-5">
      <Link to ="/employees/list">  <a className="navbar-brand mr-5 " href="#">Employees</a></Link>
      </li>
      <li className="nav-item ml-5">
       <a className="navbar-brand mr-5 " href="#" onClick = {this.handleLogout} >Logout</a>
      </li>
     
    </ul>
    <form className="form-inline offset-md-1">
    <input className="form-control mr-sm-2 " type="search" placeholder="Search Ticket" onKeyUp ={this.handleSearch} aria-label="Search" />
   
  </form>
  
</nav>            
                    </nav>
                    </div>
                   <div className = "col-md-8 mb-2 mt-3" >
                      
              <b>Ticket Table</b>
            
              
               <button className= "btn btn-primary offset-md-6" onClick = {this.handleClick} value ="All" name="all">All </button>&nbsp;
                <button className ="btn btn-primary" onClick = {this.handleClick} value="High" name="high">High </button>&nbsp;
                <button className= "btn btn-primary" onClick = {this.handleClick} value="Medium" name="medium">Medium </button>&nbsp;
                <button className = "btn btn-primary" onClick = {this.handleClick} value="Low" name="low">Low </button>
                
                </div>
                <div className ="col-md-4  mt-4">
                    <h5>Add Ticket</h5>
                </div>
                </div>
                <div className = "row">
                    <div className="col-md-8">
                    <h6>Listing Tickets- {this.state.filterTickets.length}</h6>
                <div className = "table table-striped">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Priority</th>
                            <th>Message</th>
                            <th> Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filterTickets.map(ticket=>{
                            return(
                                <tr key ={ticket._id}>
                            <td>{ticket.code}</td>
                            <td>{ticket.customer}</td>
                            <td>{ticket.department}</td>
                            <td>{ticket.priority}</td>
                            <td>{ticket.message}</td>
                            <td><input type="checkbox" value="Solved" onClick={()=>{this.handleCheck(ticket.isResolved, ticket._id)}}/> {this.state.checkMsg}</td>
                        </tr>
                            )
                        })}
                        
                    </tbody>    
                </table>
                </div>
                  </div>
               
               
               
                
                
                <Form  handleSubmit={this.handleSubmit} />
                </div>
               
                </div>
                
              
                
              
        )
    }
}