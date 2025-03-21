import {useReducer, useState} from "react"
import useRequest from "../../hooks/use-request";
import Router from "next/router"

const NewTicket = ()=>{
      const [title, setTitle] = useState("");
      const [price, setPrice] = useState("");
      const {doRequest, errors} = useRequest({
            url:'/api/tickets',
            method:"POST",
            body:{
                  title,
                  price
            },
            onSuccess:(data)=>{
                  Router.push("/")
            }
      })

      function onBlur (){
            const value = parseFloat(price);
            if(isNaN(price)){
                  return;
            }
            setPrice(value.toFixed(2))
      }
      async function onSubmit(){
            await doRequest()
      }
      return (<div>
            <h1>Create ticket</h1>
            <form onSubmit={onSubmit}>
                 <div className="form-group">
                  <label>Title</label>
                  <input
                  value={title}
                  className="form-control"
                  onChange={(e)=>setTitle(e.target.value)}
                  />
                 </div>
                 <div className="form-group">
                  <label>price</label>
                  <input 
                  value={price}
                  onBlur={onBlur}
                  onChange={(e)=>setPrice(e.target.value)}
                  className="form-control"/>
                 </div>
                 {errors}
                 <button className="btn btn-primary/">Create New Ticket</button>

            </form>
      </div>)
}
export default NewTicket