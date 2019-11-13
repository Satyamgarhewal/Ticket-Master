import React from 'react'
import {bootstrap}from 'bootstrap/dist/css/bootstrap.css'
export default class Form extends React.Component{
    constructor(){
        super()
        this.state={
           email:"",
           password:""
        }
    }
    handleChange=e=>{
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=e=>{
        e.preventDefault()
        const formData= {
            email:this.state.email,
            password:this.state.password
        }
        this.props.handleSubmit(formData)
    }
    render(){
        return(
            <div className="container">
                <div className = "row">
                    <div className ="col md-4 offset-md-5">
                <form onSubmit ={this.handleSubmit}>
                    <label htmlFor="email">Email</label><br/>
                    <input type="text" id= "email" onChange ={this.handleChange} name ="email" value = {this.state.email}/><br/><br/>
                    
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" id = "password" onChange ={this.handleChange} name="password" value = {this.state.password}/><br/><br/>
                    
                    <input type="submit" className="btn btn-primary" onChange= {this.handleChange} />
                </form>
                </div>
                </div>
            </div>
        )
    }
}