const app=require("./app")
const dotenv=require("dotenv");
const connecttodatabase=require("./config/db");

dotenv.config({path:"backend/config/config.env"})
connecttodatabase();
app.listen(process.env.PORT,()=>{
    console.log(`server listening at Port :${process.env.PORT}`);
})