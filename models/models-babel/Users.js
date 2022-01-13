"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersSchema = new _mongoose.default.Schema({
  Email: {
    type: String,
    required: 'This field is required'
  },
  Fullname: {
    type: String,
    required: 'This field is required'
  },
  Username: {
    type: String,
    required: 'This field is required'
  },
  emailIsVerified: {
    type: Boolean,
    required: 'This field is required'
  },
  Password: {
    type: String,
    required: 'This field is required'
  },
  userId: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  parentId: {
    type: Number
  },
  profile: {
    type: String
  },
  parentId: {
    type: Number
  },
  userType: {
    type: String
  }
});

var _default = _mongoose.default.model('Users', usersSchema);

exports.default = _default;