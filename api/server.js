/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes")

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@proyectscluster.jezx0i8.mongodb.net/netflix",{
}).then(()=>{
  console.log("DB Connected")
}).catch((error)=>{
  console.error("Error de conexion a MongoDb",error)
})

app.use("/api/user",userRoutes)

app.listen(5000,console.log("Server started"))

