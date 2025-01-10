 import "bootstrap/dist/css/bootstrap.css"
 import buildClient from "../api/client-build"
const NextPage =  ({Component, pageProps})=>{
      return <div>
            <h1>Header</h1>
            <Component {...pageProps} />
      </div> 
}


NextPage.getInitialProps = async(props)=>{

      console.log("geinitial from nectpage", props.ctx.req.headers);
      // const req = context.req
      try{
            const {data} = await buildClient(props.ctx.req).get("/api/users/currentuser")
            console.log(data)
            return data
          }catch(err){
            console.log("browser or ssr error", err)
            return {currentUser: undefined}
          }
   }
   
export default NextPage
