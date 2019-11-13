import React from 'react'

export default class DepartmentForm extends React.Component{
   constructor(){
       super()
       this.state={
           department:'',
       }
       this.handleSearch = this.handleSearch.bind(this)
   }
    handleSubmit=e=>{
      e.preventDefault()
      
      const formData={
          department:this.state.department
      
    }
   
      this.props.handleSubmit(formData)
      this.setState({name:''})
    }
    
    handleChange=e=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSearch(e){
        const search=e.target.value
        // console.log(search)
        this.props.handleSearch(search)
    }
    render(){
        return(
            <div>
             
                <form onSubmit ={this.handleSubmit}>
                {/* <label htmlFor="search">Search for department</label>&nbsp; */}
                {/* <input type="text" id="search" name="search"  onKeyUp = {this.handleSearch}placeholder="Search"></input> */}
                <label htmlFor="department" className =" mb-3">Department</label>
                <input type="text"  name="department"  onChange = {this.handleChange} 
                    value ={this.state.department} className="form-control mb-2" onChange={this.handleChange}  id="department" aria-describedby="department" placeholder="Enter department" />
{/*                
                <label htmlFor ="department">Enter Department</label>&nbsp;
                <input 
                    type ="text"
                    id = "department" 
                    name="department"
                   
                    /> &nbsp; */}
                   <button className ="btn btn-primary offset-md-4  mt-3" >Submit</button>
                {/* <input type="submit" value ="Submit"/> */}
                </form>
                
            </div>
            
        )
    }
}