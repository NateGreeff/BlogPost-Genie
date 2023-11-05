const router = require('express').Router();
const { BlogPosts, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await BlogPosts.findAll();

    if (!postData) {
      res.status(404).json({ message: 'No Blog Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await BlogPosts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await BlogPosts.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments,
          attributes: ['id', 'body', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No Blog Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPosts.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Blog Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;