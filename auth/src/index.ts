import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
//tesae
app.get("/api/users/currentuser", (req, res)=>{
      res.send("hello via ticketing.dev")
})
app.listen(3000, ()=>{
      console.log("express server running at 3000 via ts-node-dev");
      console.log("test21")
})
