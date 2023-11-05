const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      body: req.body.comment,
      user_id: req.session.user_id,
      blog_posts_id: req.body.blog_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No Comment found with this id!" });
      return;
    }

    if (commentData.user_id !== req.session.user_id) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this comment!" });
      return;
    }

    await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
