const app = require("./app");
const dotenv = require("dotenv");
const connecttodatabase = require("./config/db");

//handling uncaught execption

process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`Shuttin down server due to uncaught execption`);

    process.exit(1);
})


// config
dotenv.config({ path: "backend/config/config.env" });

// connect to database
connecttodatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server listening at Port :${process.env.PORT}`);
});

// unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuttin down server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
