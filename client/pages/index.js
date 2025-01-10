import React from 'react';
import buildClient from '../api/client-build';


const LandingPage =  ({currentUser})=>{
  console.log("currentUser", currentUser)
          return currentUser?  <h1>You are signed-inmmm </h1>:<h1>you are NOT signe INnnn</h1>
}

LandingPage.getInitialProps = async({req})=>{
  console.log("geinitial from randome", req.headers);

   try{
     const {data} = await buildClient(req).get("/api/users/currentuser")
     return data
   }catch(err){
     console.log("browser or ssr error", err)
     return {currentUser: undefined}
   }
}

export default LandingPage