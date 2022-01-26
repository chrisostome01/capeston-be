"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentSchema = _mongoose.default.Schema({
  userId: {
    type: String,
    required: 'User id is required'
  },
  blogId: {
    type: String,
    required: 'Blog id is required'
  },
  comment: {
    type: String,
    required: 'Comment is required'
  },
  dateCreated: {
    type: String
  }
});

var _default = _mongoose.default.model("Comment", commentSchema);

exports.default = _default;