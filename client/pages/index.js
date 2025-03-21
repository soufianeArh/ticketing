import React from 'react';
import buildClient from '../api/client-build';
import {Link} from "next/link"

const LandingPage =  ({currentUser, tickets})=>{
  console.log("currentUser", currentUser)
  return currentUser ? (
    tickets ? (
      <>
        <h1>You are signed in</h1>
        {tickets.map((ticket) => (
          <>
          <h2 key={ticket.id}>{ticket.title}</h2>
          <h2 key={ticket.id}>{ticket.price}</h2>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                 Details
            </Link>
          </>
        ))}
      </>
    ) : (
      <h1>You are signed in</h1>
    )
  ) : (
    <h1>You are NOT signed in</h1>
  );
}

LandingPage.getInitialProps = async(context, client, currentUser )=>{
  //console.log("geinitial from randome", props.headers);
  try{
    const {data} = client.get("/api/tickets");
    return {ticket: data}

  }catch{
    return {tickets: undefined}
  }
}

export default LandingPage