require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const answercollections = require("./models/answers.js");
//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const { SubmitAnswers } = require("./controllers/user.js");

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

//answer post
app.post("/api/post/answers", SubmitAnswers);

//port
const port = process.env.PORT || 8000;

//starting server
app.listen(port, () => {
  console.log(`app is running  ${port}`);
});
