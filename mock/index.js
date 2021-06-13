const express  = require("express")
const app = express()
const router = require("./router")



app.use("/", router)
app.listen(3100, function () {
    console.log("server is listen to the port 3100");
})