const mongoose = require("mongoose");

const connecttodatabase = () => {
  mongoose.connect(process.env.MONGO_URI).then((data) => {
    console.log(`connected with server ${data.connection.host}`);
  });
};

module.exports = connecttodatabase;
