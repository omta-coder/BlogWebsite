const express = require( 'express' );
const Blog = require('./../models/blogModel');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new')  
});


module.exports = router