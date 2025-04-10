import React from 'react';
import Router from "next/router";
import useRequest from '../../hooks/use-request';


export default ()=>{
      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");
      const {doRequest, errors } = useRequest({
            url:"/api/users/signup",
            method:"post", 
            body:{email,password},
            onSuccess: function(){
                  Router.push("/")
            }
      });
      async function onSubmit(e){
            e.preventDefault();
            await  doRequest();
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
            {errors}
            <button className="btn btn-primary">Sign Up</button>
      </form>
}