import { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request"
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({order, currentUser}) => {
      //fi negative => expired
    const [timeLeft, setTimeLeft] = useState("")
    const {doRequest, errors} = useRequest({
      url:"/api/payment",
      method: "POST",
      body:{orderId: ""},
      onSuccess:()=>{
            console.log("payment success")
      }

    })

    useEffect(()=>{
      const findTimeLeft = ()=>{
            const msLeft = new Date(1742617439946) - new Date();
            setTimeLeft(msLeft);
           };
           
           const timerId = setInterval(findTimeLeft, 1000);
           return ()=>{
            clearInterval(timerId)
           }
    },[]);

//      const findTimeLeft = ()=>{
//       const msLeft = new Date(order.expiresAt) - new Date();
//       setTimeLeft(msLeft);
//      };
//      findTimeLeft()

      return <>
      <h1>order Details</h1>
      {
      timeLeft < 0 ?
        <h2>OrderExpired</h2> :
        <h2>Seconds left : {timeLeft/1000}</h2>
      }
       <StripeCheckout
         token={async ({id})=>{
            await doRequest({token: id})
         }}
         stripeKey="pk_test_51R3CP2CluobIk5XB7m0YsWYtpCO7ryueeKU9NOkMIPr7GOBOxUzJOpuQwP8tE8FbyPw5ZtWDTkE47NNkokHIad8300yYdt4sHm"
      //    amount={order.ticket.price * 100}
         amount={20*100}
      //    email={currentUser.email}
         email="safdfs@sdfwde.cs"
       />
      </>
}

OrderShow.getInitialProps = async (context, client)=>{
      try {
            const {orderId} = context.query
            const {data} = await client.get(`/api/orders/${orderId}`)
            console.log("i am not  error")
            return {order: data}
      }catch(err){
            console.log("i am an error")
            return { order: {expiresAt: new Date().setSeconds(new Date().getSeconds() + 900)}}
            //network error => oops page
            //api error=> say sorry order Not found
            
      }
}
export default OrderShow
// get("/api/orders/:orderId",

