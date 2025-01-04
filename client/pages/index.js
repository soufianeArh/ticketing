import React from 'react';
import axios from 'axios';


const LandingPage =  (currentUser)=>{
      console.log(currentUser)
          return <h1>You are signed-in </h1>
}

LandingPage.getInitialProps = async()=>{
     if(typeof window === 'undefined'){
          //access ingress pod from inside the browser with clusterIP
          //https;//serviceName.namespace.svc.cluster.local
          //NameSpace > ingress-nginx ... ClusterIP > ingress-nginx-controller-admission
          try{
          const {data}= await axios.get(
               'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
                    headers:{
                         Host:'ticketing.dev'
                    }
               }
          
          );
          return data;
         }catch(error){
          console.log(error);
          return {email:"none from SSR"}
         }

     }else{
          //access ingress from outside cluster
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