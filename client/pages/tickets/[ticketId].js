import useRequest from "../../hooks/use-request";
import Router from "next/router";

const TicketShow = ({ticket})=>{
      const {doRequest, errors} = useRequest({
            url:"/api/orders",
            method: "POST", 
            body:{ticketId:ticket.id},
            onSuccess:(order)=>{
                  Router.push("/orders/[orderId]", `/orders/${order.id}`)
            }
      })
    
      return <>
      <h1>Ticket Show</h1>
      <h2>{ticket.title}</h2>
      <h2>{ticket.price}</h2>
      {errors}
      <button
      onClick={async()=>await doRequest()}
      className="btn btn-primary">
            purshase
      </button>
      </>
}
TicketShow.getInitialProps = async (context , client) =>{
      const {ticketId} = context.query
      try{
            const {data} = await client.get(`/api/tickets/${ticketId}`)
            return {ticket: data}
      }catch(err){
            return {ticketId: undefined}
      }
}
export default TicketShow