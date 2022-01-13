"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const blogSchema = new _mongoose.default.Schema({
  creatorId: {
    type: String,
    required: 'Creator id is required'
  },
  Subtitle: {
    type: String,
    required: 'Subtile is requiered'
  },
  Title: {
    type: String,
    required: 'Title is required'
  },
  dateCreated: {
    type: String,
    required: 'Date is required'
  },
  info: {
    type: String,
    required: 'In information are required'
  },
  postBanner: {
    type: String,
    required: 'Post image is require'
  }
});

var _default = _mongoose.default.model('Blogs', blogSchema);

exports.default = _default;