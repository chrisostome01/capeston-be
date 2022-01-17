"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCommenting = exports.gettingComment = exports.deletingComment = void 0;

var _connection = _interopRequireDefault(require("../../connection/connection-babel/connection"));

var _Comment = _interopRequireDefault(require("../../models/models-babel/Comment"));

var _Blogs = _interopRequireDefault(require("../../models/models-babel/Blogs"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==================== Start:: imports =================== */

/* ==================== End:: imports =================== */

/* ================== Start:: validation ================ */
const validateCommentData = data => {
  const formSchema = _joi.default.object({
    comment: _joi.default.string().required(),
    blogId: _joi.default.required()
  });

  const value = formSchema.validate(data, {
    abortEarly: false
  });
  return value;
};
/* =================== End:: validation ================= */

/* ================== Start:: Creating Commenting ================ */


const newCommenting = async (req, res) => {
  const {
    comment,
    blogId
  } = req.body;
  const {
    error
  } = validateCommentData({
    comment,
    blogId
  });
  if (error) return res.status(400).json({
    "error": error.details[0].message
  });

  try {
    const blogExist = await _Blogs.default.findOne({
      _id: blogId
    });
    if (!blogExist) return res.status(404).json({
      "error": "Blog does not exist"
    });
    const dateCreated = Date.now();
    const creatorId = req.user._id;
    const newComment = new _Comment.default({
      userId: creatorId,
      blogId,
      comment,
      dateCreated
    });
    const SavedNewComment = await newComment.save();
    res.status(200).json({
      "data": SavedNewComment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "message": "Server error"
    });
  }
};
/* =================== End:: Creating Commenting ================= */

/* ================== Start:: Getting Commenting ================ */


exports.newCommenting = newCommenting;

const gettingComment = async (req, res) => {
  if (!req.query.q || !req.query.limit) return res.status(404).json({
    "error": "Bad request"
  });
  let limitNumber = req.query.limit;
  let blogid = req.query.q;

  try {
    const commentData = await _Comment.default.find({
      blogId: blogid
    }).limit(limitNumber);

    if (commentData.length != 0) {
      res.status(200).json({
        "data": commentData
      });
    } else {
      res.status(404).json({
        "message": 'No comments found'
      });
    }
  } catch (error) {
    res.status(500).json({
      "message": 'Server error'
    });
  }
};
/* =================== End:: Getting Commenting ================= */

/* ================== Start:: Delete Commenting ================ */


exports.gettingComment = gettingComment;

const deletingComment = (req, res) => {};
/* =================== End:: Delete Commenting ================= */


exports.deletingComment = deletingComment;