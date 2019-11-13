import React from 'react'
import Form from './Form'
import axios from '../../config/axios'
import TicketsTable from '../home/Tickets'
export default class Login extends React.Component{
    constructor(){
        super()
        this.state={
            feedback:""
        }
    }
    handleSubmit = (data)=>{
        axios.post('/users/login',data)
        
        .then(response=>{

            // if(response.data==)
            console.log(response.data)
            const token = response.data
            localStorage.setItem('token', token)
          
            this.props.history.push( '/ticket')
           
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className ="container">
                <div className= "row">
                    <div className ="col-md-4 offset-md-5">
            <h5>Login Form</h5>
            </div>
            <Form handleSubmit = {this.handleSubmit} />
           
        </div>
        </div>
        )
        
    }
}