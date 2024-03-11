const express = require("express");
var app = express();
const mongoose = require("mongoose");
const blogRoute = require('./routes/blogRoute');
const Blog = require('./models/blogModel')
const port = process.env.PORT || 3000;
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => console.log(error));

app.set('view engine','ejs')
  app.get("/", async(req, res) => {
    const articles = [{
      title:"test1",
      createdAt: new Date(),
      description:"description"
    },
    {
      title:"test2",
      createdAt: new Date(),
      description:"description"
    },
  ]
  res.render("articles/index", { articles: articles });
});

app.use(express.urlencoded({ extended: true })) // middleware for handling form data

app.use("/articles",blogRoute)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
