import React from 'react';
import buildClient from '../api/client-build';


const LandingPage =  ({currentUser})=>{
  console.log("currentUser", currentUser)
          return currentUser?  <h1>You are signed-inmmm </h1>:<h1>you are NOT signe INnnn</h1>
}

LandingPage.getInitialProps = async(req, client, currentUser )=>{
  //console.log("geinitial from randome", props.headers);
   return {}
}

export default LandingPage