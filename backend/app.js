const express=require("express")

const app =express();
app.use(express.json());
// route imports
const product=require("./routes/productroutes");

app.use("/api/",product);

module.exports=app;