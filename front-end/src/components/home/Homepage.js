import React from 'react'
import {Link} from 'react-router-dom'
import Form from './Form'
import TicketsTable from './Tickets'
import axios from '../../config/axios'
export default class Home extends React.Component{

    constructor(){
        console.log('constructor')
        super()
        this.state={
            tickets:[],
            errorMsg:''
        }
// this.handleSubmit= this.handleSubmit.bind(this)
this.handleCheck = this.handleCheck.bind(this)
    }
    
    handleCheck(status,id, tickets){
        console.log('Inside HOmepage',status, id, tickets)
        // const ticket = tickets
        // console.log(ticket)
        // this.setState(prevState=>({ticket}))

    }
    componentDidMount(){
      
    }
    render(){
        console.log('render method')
        // const tickets = this.state.tickets
        return (
            <div className = "container">
                <div className = "row">
                 
                <TicketsTable  handleCheck={this.handleCheck}/>
                <br/>
                <br/>
                </div>
             

            </div>
        )
    }
}