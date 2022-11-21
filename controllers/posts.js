const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")


// We are exporting an object and all these are async methods.
module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); // Only see logged in users photos
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // Post is the schema for a gernal post
      const post = await Post.findById(req.params.id); // .params.id getting the query paramater from the url


      // When we go into the post. Also see if that post has any comments
      const comment = await Comment.find({postId: req.params.id}); // .params.id getting the query paramater from the url
      console.log(comment)



      res.render("post.ejs", { post: post, user: req.user, comment: comment }); //Once a post that machtes this id is found. Send it to the post.ejs. Also send the comment array
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Use the Post schema to create a document and save it to mongoDB
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId); // This deletes it from cloudinary becuase we no longer need it
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },


  // Create comment
  // createComment: async (req, res) => {
  //   try {

  //     console.log(req.body)


  //     // Use the Post schema to create a document and save it to mongoDB
  //     await Comment.create({
  //       text: req.body.text,
  //       likes: 0,
  //       user: req.user.id,
  //       postId: req.params.id
  //     });
  //     console.log("Post has been added!");
  //     res.redirect(`/post/${req.params.id}`); // Redirect back to the same post
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

};