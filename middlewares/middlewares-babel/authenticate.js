"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.admin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Users = _interopRequireDefault(require("../../models/models-babel/Users"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({
    "error": "Access denied"
  });

  try {
    const verified = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({
      "error": "Access denied , please try again"
    });
  }
};

exports.auth = auth;

const admin = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({
    "error": "Access denied"
  });

  try {
    const verified = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;
    const userId = verified._id;
    if (!userId) return res.status(401).json({
      "error": "Access denied "
    });
    const userData = await _Users.default.findOne({
      _id: userId
    });
    userData.userType != null && userData.userType == 'admin' ? next() : res.status(401).json({
      "error": "Access denied"
    });
  } catch (error) {
    res.status(401).json({
      "error": "Access denied , please try again"
    });
  }
};

exports.admin = admin;