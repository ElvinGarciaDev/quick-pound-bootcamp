const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // This is how we tie a comment to a specific user
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = mongoose.model("Comment", CommentSchema); // "Comment" is the collection name. It takes Comment and makes it plural. You can also add a third parameter and call the database whatever you want