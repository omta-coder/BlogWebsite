const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleRouter = require('./routes/articles');
const Article = require('./models/blogModel')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000;
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => console.log(error));

  app.set('view engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
  const articles =await Article.find().sort({ createdAt: 'desc' })
  res.render("articles/index",{articles:articles})  
});

app.use("/articles",articleRouter)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
