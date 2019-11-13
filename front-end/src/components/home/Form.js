import React from 'react'

import axios from '../../config/axios'
export default class Form extends React.Component{
    constructor(){
        super()
        this.state={
          customers:[],
          departments:[],
          employees:[],
          filterEmployees:[],
          customer:'',
          department:'',
          employee:'',
          priority:'',
          message:'',
          code:''
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleDepartment = this.handleDepartment.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        // console.log(this.state.departments)
    }
    componentDidMount(){
        //Customers Call
        axios.get('/customers/list',{
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            // console.log('customers -- axios success')
            // console.log(response.data)
            const customers = response.data
            this.setState({customers})
        })
        .catch(err=>{
            console.log(err)
        })
        
        //departments call
        axios.get('/departments/list', {
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            // console.log ('departments call -- axios success', response.data)
            const departments= response.data
            this.setState({departments})

        })
        .catch(err=>{
            console.log(err)
        })

        //employees call
        axios.get('/employees/list', {
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(' employees-call--axios-success')
            console.log(response.data)
            const employees = response.data
            this.setState({employees, filterEmployees:employees})
            // console.log('inside employees',this.state.filterEmployees)
        })




    }

handleChange=(e)=>
{
    console.log('handle Change--', e.target.name, e.target.value)
    this.setState({
        [e.target.name]: e.target.value
    })

   
}
     handleDepartment=(e)=>{
         const dept = e.target.value
             const  filterEmployees=[]
             this.state.employees.forEach(employee=>{
                  if(employee.department===dept){
                      filterEmployees.push(employee) 
                  }
             })
             this.setState(prevState=>({filterEmployees}))
             console.log(filterEmployees)
             const department = e.target.value
              this.setState({department})
       
       
    }
    handleSubmit=(e)=>{
        
        e.preventDefault()
        console.log('handle submit cliked')
        const formData={
            code:'DCT-'+Math.round(Math.random()*1000),
            customer:this.state.customer,
            department:this.state.department,
            employee:this.state.employee,
            priority:this.state.priority,
            message:this.state.message,
           
        }
        
        this.props.handleSubmit(formData)
        this.setState(prevState=>({
            customer:'',
            department:'',
            employee:'',
            priority:'',
            message:'',
            

        }))
        this.setState(prevState=>({
            customer:'',
            employee:'',
            department:'',
            priority:'',
            message:''
           
        }))

    }

    render(){
    
        return(
            <div className = "form-check">
               
               <form onSubmit={this.handleSubmit}>
                   <label htmlFor = "customers">Select Customer</label>
                <select className = "form-control  custom-select mr-sm-2" onChange= {this.handleChange} id="customers" name= "customer">
                    <option value="">Select customer</option>
                    {this.state.customers.map(customer=>{
                       return <option value = {customer.name} key={customer._id}>{customer.name}</option>
                    })}
                </select><br/><br/>
                    <label htmlFor= "departments">Select Department</label>
                <select className = " form-control  custom-select mr-sm-2"onChange = {this.handleDepartment} id="departments" name = "department">
                    <option value="">Select department</option>
                    {this.state.departments.map(department=>{
                    //    return <option key = {department._id} value ={department._id}>{department.department}</option>
                    return <option key ={department._id} value = {department.department} >{department.department}</option>
                    // console.log(department._id)
                    })}
                </select><br/><br/>


                <label htmlFor= "employees">Select Employees</label>
                <select className = "form-control  custom-select mr-sm-2" onChange = {this.handleChange} id="employees" name = "employee">
                    <option value="">Select employee</option>
                    {this.state.filterEmployees.map(employee=>{
                       return <option key = {employee._id}value ={employee.name}>{employee.name}</option>
                    })}
                </select><br/><br/>
               
                {/* <div class="form-check">
                
                <input class="form-check-input" type="radio" name="priority" id="exampleRadios1" value="High" checked />
                <label class="form-check-label" for="exampleRadios1">
                    High
                </label> <br/>
                <input class="form-check-input" type="radio" name="priority" id="exampleRadios1" value="Medium" checked />
                <label class="form-check-label" for="exampleRadios1">
                    Medium
                </label><br/>
                <input class="form-check-input" type="radio" name="priority" id="exampleRadios1" value="Low" checked />
                    <label class="form-check-label" for="exampleRadios1">
                        Low
                    </label>
                </div> */}
               <div className = "offset-md-1">
                <label onChange = {this.handleChange}>Priority <br/>
                    <input className="form-check-input " type="radio" name="priority" value="High" id="priority"/>High <br/>
                    <input  className="form-check-input " type="radio" name="priority" value="Medium" id="priority"/>Medium<br/>
                    
                    <input  className="form-check-input " type="radio" name="priority" value="Low" id="priority"/>Low <br/>
                    </label>
                    </div>
                    <br/>
                    <label htmlFor="message">Message: &nbsp;</label>
                    <input className = "form-control" row="5" type="text" name='message'id="message"  onChange={this.handleChange}/>
                    <button className = "btn btn-primary mt-3 mb-3" type="submit" value="Submit">Submit </button>
               </form>
            </div>
        )
    }
}