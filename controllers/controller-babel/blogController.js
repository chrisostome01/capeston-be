"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.getSpacificBlog = exports.getAllBlogs = exports.deleteBlog = exports.createNewblog = void 0;

var _connection = _interopRequireDefault(require("../../connection/connection-babel/connection"));

var _Blogs = _interopRequireDefault(require("../../models/models-babel/Blogs"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* ============ Start:: Getting all Blogs but with limit ============= */


const getAllBlogs = async (req, res) => {
  try {
    let limitNumber = 5;
    const blogsData = await _Blogs.default.find({}).limit(limitNumber);

    if (blogsData.length != 0) {
      res.status(200).json(blogsData);
    } else {
      res.status(401).json({
        "message": 'No blogs found'
      });
    }
  } catch (error) {
    res.status(500).json({
      "message": 'Server error'
    });
  }
};
/* ============== End:: Getting all Blogs but -with limit ============= */

/* ============ Start:: Getting spacific Blogs ============= */


exports.getAllBlogs = getAllBlogs;

const getSpacificBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    let query = {
      _id: blogId
    };

    if (blogId.trim() === '' || blogId.trim() === null) {
      res.status(400).json({
        'message': "Bad request"
      });
      return;
    }

    let data = await _Blogs.default.find(query);

    if (data.length != 0) {
      res.status(200).json(data);
      return;
    } else {
      res.status(404).json({
        "message": 'blog not found'
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      "message": 'Server error'
    });
  }
};
/* ============== End:: Getting spacific Blogs ============= */

/* ============ Start:: Create Blog  ============= */


exports.getSpacificBlog = getSpacificBlog;

const createNewblog = async (req, res) => {
  const newBlogData = req.body;

  try {
    // validations will happen here
    if (!newBlogData) {
      res.status(400).json({
        'message': "Please make sure you have provided all blogs information"
      });
      return;
    }

    await _Blogs.default.insertMany([newBlogData]);
    res.status(200).json(newBlogData);
  } catch (error) {
    res.status(500).json({
      "message": "Server error"
    });
  }
};
/* ============== End:: Create Blog  ============= */

/* ============ Start:: Create Blog  ============= */


exports.createNewblog = createNewblog;

const deleteBlog = async (req, res) => {
  try {
    let blogId = req.body.blogId;
    let query = {
      _id: blogId
    };

    if (blogId.trim() === '' || blogId.trim() === null) {
      res.status(400).json({
        'message': "Bad request"
      });
      return;
    }

    let data = await _Blogs.default.deleteOne(query);

    if (data.deletedCount === 1) {
      res.status(200).json({
        "success": `blog with this id ${blogId} have been deleted`
      });
      return;
    } else {
      res.status(404).json({
        "message": 'we don\'t have that blog'
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      "message": 'Server error'
    });
  }
};
/* ============== End:: Create Blog  ============= */

/* ============ Start:: Create Blog  ============= */


exports.deleteBlog = deleteBlog;

const updateBlog = async (req, res) => {
  try {
    let blogId = req.body.blogId;
    let formData = req.body;

    if (blogId.trim() === '' || blogId.trim() === null) {
      res.status(400).json({
        'message': "Bad request"
      });
      return;
    } // if(formData.trim() === '' || formData.trim() === null){
    //     res.status(400).json({'message' : "Provide what to update"});
    //     return;
    // } 


    let query = {
      _id: blogId
    };
    let data = await _Blogs.default.updateOne({
      query,
      $set: formData
    });

    if (data.matchedCount === 1) {
      if (data.modifiedCount == 1) {
        res.status(200).json({
          "success": `blog with this id ${blogId} have been updated`
        });
        return;
      } else {
        res.status(200).json({
          "success": `Nothing to update on id ${blogId}`
        });
        return;
      }
    } else {
      res.status(404).json({
        "message": 'we don\'t have that blog'
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      "message": 'Server error'
    });
  }
};
/* ============== End:: Create Blog  ============= */


exports.updateBlog = updateBlog;