"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.getSpacificBlog = exports.getAllBlogs = exports.deleteBlog = exports.createNewblog = void 0;

var _connection = _interopRequireDefault(require("../../connection/connection-babel/connection"));

var _Blogs = _interopRequireDefault(require("../../models/models-babel/Blogs"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ============ Start:: validation ================== */
const validateBlogData = data => {
  const formSchema = _joi.default.object({
    Subtitle: _joi.default.string().required().min(2),
    Title: _joi.default.string().required().min(3),
    Description: _joi.default.string().required(),
    postBanner: _joi.default.string().required()
  });

  const value = formSchema.validate(data, {
    abortEarly: false
  });
  return value;
};
/* ============ End:: Validation ==================== */

/* ============ Start:: Getting all Blogs but with limit ============= */


const getAllBlogs = async (req, res) => {
  let limitNumber = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 6;

  try {
    const blogsData = await _Blogs.default.find({}).limit(limitNumber);

    if (blogsData.length != 0) {
      res.status(200).json(blogsData);
    } else {
      res.status(404).json({
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
  let blogId = req.params.blogId;
  if (blogId == null || blogId == undefined || blogId.trim() == '') return res.status(400).json({
    "error": "Bad request"
  });

  try {
    let query = {
      _id: blogId
    };

    if (blogId.trim() === '' || blogId.trim() === null) {
      res.status(400).json({
        'error': "Bad request"
      });
      return;
    }

    let data = await _Blogs.default.find(query);

    if (data.length != 0) {
      res.status(200).json(data);
      return;
    } else {
      res.status(404).json({
        "error": 'blog not found'
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      "error": 'Server error'
    });
  }
};
/* ============== End:: Getting spacific Blogs ============= */

/* ============ Start:: Create Blog  ============= */


exports.getSpacificBlog = getSpacificBlog;

const createNewblog = async (req, res) => {
  const {
    Subtitle,
    Title,
    Description,
    postBanner
  } = req.body;
  const {
    error
  } = validateBlogData({
    Subtitle,
    Title,
    Description,
    postBanner
  });
  let rate = 1;
  if (error) return res.status(400).json({
    "error": error.details[0].message
  });

  try {
    const dateCreated = Date.now();
    const creatorId = req.user._id;
    const newBlog = new _Blogs.default({
      Subtitle,
      Title,
      creatorId: creatorId,
      dateCreated,
      info: Description,
      postBanner,
      rate
    });
    const savedBlog = await newBlog.save();
    res.status(200).json({
      "blogId": newBlog._id
    });
  } catch (error) {
    console.log(error);
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