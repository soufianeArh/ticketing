import { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request"

const OrderShow = ({order}) => {
      //fi negative => expired
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(()=>{
      const findTimeLeft = ()=>{
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(msLeft);
           };
           
           setInterval(findTimeLeft, 1000)
    },[]);

//      const findTimeLeft = ()=>{
//       const msLeft = new Date(order.expiresAt) - new Date();
//       setTimeLeft(msLeft);
//      };
//      findTimeLeft()

      return <>
      <h1>order Details</h1>
      <h2>Seconds left : {timeLeft/1000}</h2>
      <h2>OrderId : {order.id}</h2>
      <h2>titile : {order.ticket.id}</h2>
      <h2>OrderId : {order.ticket.price}</h2>
       
      <button onClick={()=>{}}
      className="btn -btn-primary">
            Pay Now
      </button>
      </>
}

OrderShow.getInitialProps = async (context, client)=>{
      try {
            const {orderId} = context.query
            const {data} = await client.get(`/api/orders/${orderid}`)
            return {order: data}
      }catch(err){
            //network error => oops page
            //api error=> say sorry order Not found
            
      }
}
export default OrderShow
// get("/api/orders/:orderId",

