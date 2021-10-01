// // Export mongoose
// const mongoose = require("mongoose");
// require("dotenv").config();
// //CURRENTLY ACCESSING MY PC'S ENV VARS
// //TODO ALLOW ACCESS TO ENV VARIABLES

// //Assign MongoDB connection string to Uri and declare options settings
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@senpai.v11ar.mongodb.net/senpaidb`;
// // Declare a variable named option and assign optional settings
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// // Connect MongoDB Atlas using mongoose connect method
// mongoose.connect(uri, options).then(
//   () => {
//     console.log("Database connection established!");
//   },
//   (err) => {
//     {
//       console.log("Error connecting Database instance due to:", err);
//     }
//   }
// );

// mongoose.connection.on("connected", () => {
//   console.log("Mongoose is connected!");
// });
