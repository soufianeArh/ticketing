import express from "express";

const router = express.Router();
console.log(typeof router)

router.get("/api/users/signup", (req,res)=>{
      res.send("signup user")
})

export { router as signupRouter };