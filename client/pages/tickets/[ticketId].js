import useRequest from "../../hooks/use-request"

const TicketShow = ({ticket})=>{
      const {doRequest, errors} = useRequest({
            url:"/api/orders",
            method: "POST", 
            body:{ticketId:ticket.id},
            onSuccess:(order)=>{
                  console.log("order succcess")
            }
      })

      return <>
      <h1>Ticket Show</h1>
      <h2>{ticket.title}</h2>
      <h2>{ticket.price}</h2>
      {errors}
      <button
      onClick={doRequest}
      className="btn btn-primary">
            purshase
      </button>
      </>
}
TicketShow.getInitialProps = (context , client) =>{
      const {ticketId} = context.query
      try{
            const {data} = client.get(`/api/tickets/${ticketId}`)
            return {ticket: data}
      }catch(err){
            return {ticketId: undefined}
      }
}
export default TicketShow