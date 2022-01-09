const app = require("./app");
const connecttodatabase = require("./config/db");
const cloudinary = require("cloudinary");

//handling uncaught execption

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shuttin down server due to uncaught execption`);

  process.exit(1);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// connect to database
connecttodatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
