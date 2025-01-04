import React from 'react';
import axios from 'axios';


const LandingPage =  (currentUser)=>{
      console.log(currentUser)
          return <h1>You are signed-in </h1>
}

LandingPage.getInitialProps = async({req})=>{
     console.log(req.headers.cookie)
     if(typeof window === 'undefined'){
          try{
          const {data}= await axios.get(
               'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
                    headers:req.headers
               }
          );
          return data;
         }catch(error){
          console.log(error);
          return {email:"none from SSR"}
         }
     }else{
          try{
               const response = await axios.get('/api/users/currentuser');
               return {email: response.data}
              }catch(err){
               console.log("some error while fetching", err)
               return {email:"none from browser"}
              }
     }
}

export default LandingPage