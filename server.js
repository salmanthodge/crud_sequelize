require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const sequelize = require("./config/DB");

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api",userRoutes)
app.use("/api",productRoutes)

sequelize.sync().then(()=>{
    console.log("database synced")
}).catch((err)=>{
    console.log("unable to sync",err)
})



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

