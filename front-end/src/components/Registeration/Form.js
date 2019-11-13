import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import {Link} from 'react-router-dom'
export default class Form extends React.Component{
    constructor(){
        super()

        this.state={
            firstName:"",
            lastName:"",
            userName:"",
            email:"",
            password:""
        }
    }
    handleChange=e=>{
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        console.log('submit button clicked')

        const formData={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            userName:this.state.userName,
            email:this.state.email,
            password:this.state.password
        }

        this.props.handleSubmit(formData)
        this.setState(prevState=>({
            firstName:'',
            lastName:'',
            userName:'',
            email:'',
            password:''

        }))
    }
    render(){
        // console.log(this.props)
        return(
            <div className="container">
                <div className= "row">
                    <div className = "col-md-4 offset-md-5">
                    {(this.props.result)?(
                        <div class="alert alert-success" role="alert">
                        {this.props.feedback}
                      </div>
                    ):(<div class="alert alert-danger" role="alert">
                    {this.props.feedback}
                  </div>)}
                <form onSubmit = {this.handleSubmit}>
                <label htmlFor= "firstName">First name</label><br/>
                <input type = "text" placeholder="First name" id="firstName" name ="firstName"onChange = {this.handleChange} value = {this.state.firstName} /> <br/><br/>

                <label htmlFor= "lastName">Last name</label><br/>
                <input type = "text" placeholder="last name" id="lastName" name ="lastName"onChange = {this.handleChange} value = {this.state.lastName} /> <br/><br/>

                <label htmlFor= "userName">User name</label><br/>
                <input type = "text" placeholder="User name" id="userName" name ="userName"onChange = {this.handleChange} value = {this.state.userName} /> <br/><br/>

                <label htmlFor= "email">Email</label><br/>
                <input type = "text" placeholder="email" id="email" name ="email"onChange = {this.handleChange} value = {this.state.email} /> <br/><br/>

                <label htmlFor= "password">Password</label><br/>
                <input type = "password" placeholder="password" id="password" name ="password"onChange = {this.handleChange} value = {this.state.password} /> <br/><br/>
                <input type="submit" className = "btn btn-primary mr-3" value = "submit" />
                <Link to  ="/login" > <input type = "button" className ="btn btn-primary" value = "Login" /></Link>
                </form>
                </div>
                </div>
                <br/>
            </div>
        )
    }
}