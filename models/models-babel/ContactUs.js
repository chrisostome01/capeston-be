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

const contactSchema = new _mongoose.default.Schema({
  comment: {
    type: String,
    required: 'Comment id is required'
  },
  email: {
    type: String,
    required: 'Email is requiered'
  },
  isNewContact: {
    type: Boolean,
    required: 'New status required'
  },
  subject: {
    type: String,
    required: 'subjectis required'
  },
  dateCreated: {
    type: String
  }
});

var _default = _mongoose.default.model('Contact', contactSchema);

exports.default = _default;