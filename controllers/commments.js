// When a request of /comments comes in, the router will be told to home here and get the method that was called, in this case we're calling the createComment method


const Comment = require("../models/Comment") // Bring in the comments model


// We are exporting an object and all these are async methods.
module.exports = {

  // Create comment
  createComment: async (req, res) => {
    try {

      console.log(req.body)


      // Use the Post schema to create a document and save it to mongoDB
      await Comment.create({
        text: req.body.text,
        likes: 0,
        user: req.user.id,
        postId: req.params.id
      });
      console.log("Post has been added!");
      res.redirect(`/post/${req.params.id}`); // Redirect back to the same post
    } catch (err) {
      console.log(err);
    }
  },

};