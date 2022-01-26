"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAllUsers = exports.login = exports.getSpacificUser = exports.createNewUser = void 0;

var _connection = _interopRequireDefault(require("../../connection/connection-babel/connection"));

var _Users = _interopRequireDefault(require("../../models/models-babel/Users"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _validation = require("../../validation/validation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==================== Start:: imports =================== */
_dotenv.default.config();
/* ==================== End:: imports ==================== */

/* =========== Start:: Getting all users ========== */


const selectAllUsers = async (req, res) => {
  try {
    let limitNumber = req.query.limit;
    const users = await _Users.default.find({}).limit(limitNumber);
    res.status(200).json({
      "data": users
    });
  } catch (error) {
    res.status(500).json({
      "error": error.message
    });
  }
};
/* =========== end:: Getting all users ============ */

/* =========== Start:: Getting spacific users ===== */


exports.selectAllUsers = selectAllUsers;

const getSpacificUser = async (req, res) => {
  let username = req.query.username;

  if (username.trim() === '' || username.trim() === null) {
    res.status(400).json({
      'error': "Bad request"
    });
    return;
  }

  try {
    var query = {
      Username: username
    };
    const userFound = await _Users.default.find(query);

    if (userFound.length == 0) {
      res.status(404).json({
        'error': "User does not exist"
      });
      return;
    } else {
      res.status(200).json(userFound);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "error": error.message
    });
  }
};
/* =========== End:: Getting spacific users ======= */

/* =========== Start:: Creating new users ======== */


exports.getSpacificUser = getSpacificUser;

const createNewUser = async (req, res) => {
  const {
    Username,
    password,
    Email,
    Fullname
  } = req.body;
  const emailIsVerified = false;
  const {
    error
  } = (0, _validation.registerValidation)({
    Email,
    password,
    Username,
    Fullname
  });
  if (error) return res.status(400).json({
    "error": error.details[0].message
  });

  try {
    const salt = await _bcrypt.default.genSalt(10);
    const hashedPassword = await _bcrypt.default.hash(password, salt);
    /* ===== Start:: making sure email is unique ====== */

    const emailExist = await _Users.default.findOne({
      Email: Email
    });
    if (emailExist) return res.status(400).json({
      "error": "Email already exist "
    });
    /* ====== End:: making sure email is unique ======= */

    const newUser = new _Users.default({
      Username,
      Password: hashedPassword,
      Email,
      emailIsVerified,
      Fullname,
      userType: "normal"
    });
    const savedUser = await newUser.save();
    res.status(200).json({
      "data": {
        Username,
        Email,
        Fullname
      }
    });
  } catch (error) {
    res.status(500).json({
      "error": error.message
    });
  }
};
/* =========== End:: Creating new users ========== */

/* =========== Start:: Login users ======== */


exports.createNewUser = createNewUser;

const login = async (req, res) => {
  // validation for joi
  const {
    Email,
    Password
  } = req.body;
  const {
    error
  } = (0, _validation.loginValidation)({
    Email,
    Password
  });
  if (error) return res.status(400).json({
    "error": error.details[0].message
  });

  try {
    const emailExist = await _Users.default.findOne({
      Email: Email
    });
    if (!emailExist) return res.status(400).json({
      "error": "Unknown user email "
    });
    const passwordMatch = await _bcrypt.default.compare(Password, emailExist.Password);
    if (!passwordMatch) return res.status(400).json({
      "error": "Wrong password"
    }); // setting token

    const token = _jsonwebtoken.default.sign({
      _id: emailExist._id
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).status(200).json({
      "message": "Logged in",
      "token": token
    });
  } catch (error) {
    console.log(error);
  }
};
/* =========== End:: Login users ========== */


exports.login = login;