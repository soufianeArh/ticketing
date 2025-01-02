import React from 'react';
import axios from 'axios';


const LandingPage =  (currentUser)=>{
      console.log(currentUser)
          return <h1>You are signed-in </h1>
}

LandingPage.getInitialProps = async()=>{
     try{
      const response = await axios.get('https://ticketing.dev/api/users/currentuser');
     // return response.data; 
      return {email: "response.data"}
     }catch(err){
      console.log("some error while fetching", err)
      return {email:"none"}
     }
}

export default LandingPage