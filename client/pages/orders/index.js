const ordersIndex = ({orders})=>{
      return <ul>{
            orders && orders.map((order)=>{
                  return <li>
                        {order.title} - {order.status}
                  </li>
            })}
            </ul>
      }


ordersIndex.getInitialProps = async (context , client)=>{
      //return 
      // /api/orders
      try{
            const {data} = await client.get(`/api/orders`)
            return {orders: data}
      }
      catch(err){
            return {orders:undefined}
      }
}