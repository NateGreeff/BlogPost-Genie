const router = require('express').Router();
const { BlogPosts } = require('../models');

router.get('/', async (req, res) => {
    try {

      const blogPostData = await BlogPosts.findAll();
      blogPosts = blogPostData.map((post) => post.get({plain: true}))

      res.render('homepage', { 
        blogPosts,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('register');
});

router.get('/new-post', (req, res) => {
  try {
    // if (!req.session.logged_in) {
    //   res.redirect('/');
    //   return;
    // }
    res.render('new-post', { 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;