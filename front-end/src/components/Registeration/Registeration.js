import React from 'react'
import Form from './Form'
import axios from '../../config/axios'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
export default class Registeration extends React.Component{
    constructor(){
        super()
        this.state={
            result:"",
            feedback:""
        }
    }
   handleSubmit=(data)=>{
       console.log('data from form',data)
       axios.post('/users/register', data)
       .then(response=>{
           console.log(response.data)
           const result = true
           this.setState({result})
           
           const feedback = response.data
           this.setState({feedback})

       })
       .catch(err=>{
          const feedback = err
          this.setState({feedback})
       })
   }
    render(){
        return(
            <div className = "container">
                <div className = 'row'>
                    {/* <div className  ="col-md-4 offset-md-4">
                <h2>Registeration Form</h2>
                </div> */}
                <br/>
                <Form handleSubmit = {this.handleSubmit} feedback = {this.state.feedback} result = {this.state.result}/>
                
               
                </div>
            </div>
        )
    }
}