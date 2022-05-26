if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/marketplace-backend"
async function main() {
  await mongoose.connect(dbUrl);
}
main().catch((err) => console.log(err));

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// router
const listingRouters = require("./routers/listings");
const userRouters = require("./routers/users");

app.use("/listings", listingRouters);
app.use("/users", userRouters);
app.get("/testing", (req, res) => {
  console.log("testing route");
  res.send("this is testing route");
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
