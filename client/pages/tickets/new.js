import {useState} from "react"

const NewTicket = ()=>{
      const [title, setTitle] = useState("");
      const [price, setPrice] = useState("");
      function onBlur (){
            const value = parseFloat(price);
            if(isNaN(price)){
                  return;
            }
            setPrice(value.toFixed(2))
      }
      return (<div>
            <h1>Create ticket</h1>
            <form>
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
                 <button className="btn btn-primary/"></button>

            </form>
      </div>)
}
export default NewTicket