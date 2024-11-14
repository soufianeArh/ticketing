import express from "express";

const router = express.Router();


router.get("/api/users/signout", (req,res)=>{
      res.send("signout user")
})

export { router as signoutRouter };