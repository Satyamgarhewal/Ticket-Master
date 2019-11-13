import React from 'react'
import {Link} from 'react-router-dom'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
export default class Form extends React.Component{
    constructor()
    {
        super()
        
        this.state={
            name:'',
            email:'',
            mobile:''
        }
        this.handleSubmit =this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
handleSubmit(e){
    e.preventDefault()
    console.log('handle Submit cliked')
    console.log(e.target)
    const customerData={
        name:this.state.name,
        email:this.state.email,
        mobile:this.state.mobile
    }
  this.props.handleSubmit(customerData)
  this.setState({
      name:'',
      email:'',
      mobile:''
  })

}
handleChange (e){
// console.log('handle change clicked', e.target, e.target.value)
this.setState({
    [e.target.name]: e.target.value
})
console.log(this.state.name)
}
    render(){
        return(
          <div className ="form-group " >
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text"  name="name" className="form-control mb-2" onChange={this.handleChange}  id="name" aria-describedby="name" placeholder="Enter name" />
                {/* <label htmlFor="name"> Name:</label>
                <input type ="text" value={this.state.name} onChange = {this.handleChange}id = "name" name="name" placeholder ="Name"/>
                <br/> */}
                     <label htmlFor="email">Email</label>
                <input type="text"  name="email" className="form-control mb-2" onChange={this.handleChange}  id="email" aria-describedby="email" placeholder="Enter email" />
                <small id="email" className="form-text text-muted mb-2">We'll never share your email with anyone else.</small>

                {/* <label htmlFor="email"> Email:</label>
                <input type ="text" value={this.state.email} onChange = {this.handleChange} id = "email" name="email" placeholder ="Email"/>
                <br/> */}
                   <label htmlFor="mobile">Mobile</label>
                <input type="text"  name="mobile" className="form-control mb-2" onChange={this.handleChange}  id="mobile" aria-describedby="mobile" placeholder="Enter mobile" />
                <small id="mobile" className="form-text text-muted mb-2">We'll never share your mobile with anyone else.</small>

                {/* <label htmlFor="mobile"> Mobile:</label>
                <input type ="text" mobile={this.state.mobile} onChange = {this.handleChange} id = "mobile" name="mobile" placeholder="Mobile"/>
                <br/> */}
              
                {/* <input type="submit" value ="Submit"/> */}
                <button className = "btn btn-primary offset-md-4" type  ="submit" value = "Submit">Submit</button>
               
               
                </form>
                </div>
               
        )
    }
   
}