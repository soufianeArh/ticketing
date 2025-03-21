 import "bootstrap/dist/css/bootstrap.css"
 import buildClient from "../api/client-build";
 import Header from "../components/header"

const NextPage =  ({Component, randomPageGetInitilalCall, currentUser})=>{
      console.log(currentUser)
      return <div>
            <Header prop = {currentUser}/>
            <div className="container">
              <Component  currentUser={currentUser} {...randomPageGetInitilalCall} />
            </div>
      </div> 
}


NextPage.getInitialProps = async(props)=>{
      // console.log("geinitial from nectpage", props.ctx.req.headers);
      try{
            const client = await buildClient(props.ctx)
            const {data} = client.get("/api/users/currentuser")
            let randomPageGetInitilalCall = {};
            if(props.Component.getInitialProps){
                  randomPageGetInitilalCall = await props.Component.getInitialProps(props.ctx, client, data.currentUser);
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
