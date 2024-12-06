import React from 'react'
import axios from "axios"


export default ()=>{
      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");
      const [errors, setErrors] = React.useState([]);

      async function onSubmit(e){
            e.preventDefault();
            try{
                  const response = await axios.post("/api/users/signup", {email, password})
                  console.log(response.data)
            }catch(err){
                  console.log(err.response.data)
                 setErrors(err.response.data.errors)
            }
      }
      
      return <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                  <label>Email address</label>
                  <input
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="form-control"/>
            </div>
            <div className="form-group">
                  <label>Password</label>
                  <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="form-control"/>
            </div>
            <div className="alert alert-danger">
                  Oops... 
                  <ul className="my-0">
                        {errors.map(error=><li key={error.message}>{error.message}</li>)}
                  </ul>
            </div>
            <button className="btn btn-primary">Sign Up</button>
      </form>
}