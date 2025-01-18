 import "bootstrap/dist/css/bootstrap.css"
 import buildClient from "../api/client-build"
const NextPage =  ({Component, randomPageGetInitilalCall, currentUser})=>{
      return <div>
            <h1>Header {currentUser.email} </h1>
            <Component {...randomPageGetInitilalCall} />
      </div> 
}


NextPage.getInitialProps = async(props)=>{
      // console.log("geinitial from nectpage", props.ctx.req.headers);
      try{
            const {data} = await buildClient(props.ctx.req).get("/api/users/currentuser")
            let randomPageGetInitilalCall = {};
            if(props.Component.getInitialProps){
                  randomPageGetInitilalCall = await props.Component.getInitialProps(props.ctx.req);
                  console.log("randomPageGetInitilalCall",randomPageGetInitilalCall);//exact retrun of it

            }
            console.log("nexpage data",data)
            return {
                  randomPageGetInitilalCall,
                  currentUser:data.currentUser,
                  ...data
            }
          }catch(err){
            console.log("browser or ssr error", err)
            return {currentUser: undefined}
          }
   }
   
export default NextPage
