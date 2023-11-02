
const express = require("express");

const cors = require("cors");

const connection = require("./db");

const userRouter = require("./route/userRoute")

const blogRouter = require("./route/blogRoute")

const {auth} = require("./middlewear/auth")

 const app = express();

 app.use(express.json());

 app.use(cors());


 app.use("/user", userRouter)

app.use(auth)


app.use("/blog", blogRouter);
 app.get("/", (req,res) =>{
    res.send("welcome to blog app");
 })




 app.listen(6000, async () =>{
    try {
        await connection
console.log("connect to atlas mock-6DB!!!!!!!!")

    } catch (error) {
        console.log(error)
    }
console.log("Server runs on port 6000")
 })