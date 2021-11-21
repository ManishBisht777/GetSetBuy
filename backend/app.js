const express=require("express")

const app =express();

// route imports
const product=require("./routes/productroutes");

app.use("/api/",product);

module.exports=app;