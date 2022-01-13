"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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
    res.status(500).json({
      "error": "Access denied , please try again"
    });
  }
};

var _default = auth;
exports.default = _default;