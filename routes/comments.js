// When a request of /comments comes in, this router will have the controller that has the instructions to run

const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commments");



router.post("/createComment/:id", commentController.createComment); // The form acttion will be /post/createComment/<%= post.id %>

module.exports = router;