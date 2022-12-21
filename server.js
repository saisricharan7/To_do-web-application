const express= require("express");
const app= express();
const cors= require("cors");
const mongoose= require("mongoose");

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://sai_charan:saicharan@cluster0.pu747xs.mongodb.net/todoDB")
app.use("/",require("./route"));
app.listen(3001,function(){
    console.log("server is running on port 3001")
})