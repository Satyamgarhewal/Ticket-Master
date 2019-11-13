import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import {Link} from 'react-router-dom'
import axios from'../../config/axios'
export default class EmployeeForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            mobile:'',
            department:'',
            departments:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        
    }
    handleSubmit(e){
        e.preventDefault()
        const data={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department
        }
        this.props.handleSubmit(data)
        this.setState(prevState=>({
            name:'',
            email:'',
            mobile:'',
            department:''
        }))
    }
    handleChange(e){
        console.log(e.target.value)
       this.setState({
           [e.target.name]:e.target.value
       })
       
    }
        componentDidMount(){
            axios.get('/departments/list',{
                headers:{
                    'x-auth':localStorage.getItem('token')
                }
            })
            .then(response=>{

                console.log('axios success')
                console.log(response.data)
                console.log(response.data)
                const departments=response.data
                this.setState({departments})
            })
            console.log(this.state.departments)
        }
    render(){
        return(

            <div className="form-group">

                <form onSubmit= {this.handleSubmit} >
               
                <label htmlFor="name">Name</label>
                <input type="text"  name="name" className="form-control mb-2" onChange={this.handleChange}  id="name" aria-describedby="name" placeholder="Enter name" />
                {/* <small id="name" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            
                    {/* <label htmlFor="name">Name</label>
                <input type="text" name="name" id ="name" onChange={this.handleChange} />
                <br/> */}
                <label htmlFor="email">Email</label>
                <input type="text"  name="email" className="form-control"onChange={this.handleChange}  id="email" aria-describedby="email" placeholder="Enter email" />
                <small id="email" className="form-text text-muted mb-2">We'll never share your email with anyone else.</small>
            
                {/* <label htmlFor="email">Email</label>
                <input type="text" name="email" id ="email" onChange={this.handleChange} />
                <br/> */}
                  <label htmlFor="mobile">Mobile</label>
                <input type="text"  name="mobile" className="form-control"onChange={this.handleChange}  id="mobile" aria-describedby="mobile" placeholder="Enter mobile" />
                <small id="mobile" className="form-text text-muted mb-2">We'll never share your mobile with anyone else.</small>

                {/* <label htmlFor="mobile">Mobile</label>
                <input type="text" name="mobile" id ="mobile" onChange={this.handleChange} />
                <br/> */}
                {/* <select class="form-control form-control-sm">
                <option>Small select</option>
                </select> */}
                <label htmlFor = "Department">Department</label>
                <select className="form-control form-control-sm" onChange={this.handleChange} name="department">
                    <option value="">Select Department</option>
                    {this.state.departments.map(department=>{
                        return <option value={department.department} key={department._id}>{department.department}</option>
                    })}
                </select>
                <div className ="row mt-3 p-2">
             <button className ="btn btn-primary offset-md-4 mt-2 " type="submit" >Submit</button>
                {/* <input type="submit" value="Submit" />&nbsp; */}
             
              </div>
                </form>
                </div>
           
        )
    }
}