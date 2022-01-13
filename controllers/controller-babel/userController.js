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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==================== Start:: DB data =================== */
_dotenv.default.config();
/* ==================== End:: DB data ==================== */

/* =========== Start:: Getting all users ========== */


const selectAllUsers = async (req, res) => {
  try {
    let limitNumber = req.query.limit;
    const users = await _Users.default.find({}).limit(limitNumber);
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
/* =========== end:: Getting all users ============ */

/* =========== Start:: Getting spacific users ===== */


exports.selectAllUsers = selectAllUsers;

const getSpacificUser = async (req, res) => {
  let username = req.query.username;

  if (username.trim() === '' || username.trim() === null) {
    res.status(400).json({
      'message': "Bad request"
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
        'message': "User does not exist"
      });
      return;
    } else {
      res.status(200).json(userFound);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "message": "Server error"
    });
  }
};
/* =========== End:: Getting spacific users ======= */

/* =========== Start:: Creating new users ======== */


exports.getSpacificUser = getSpacificUser;

const createNewUser = async (req, res) => {
  try {
    const {
      Username,
      password,
      Email,
      userId,
      emailIsVerified,
      Fullname
    } = req.body;
    const salt = await _bcrypt.default.genSalt(10);
    const hashedPassword = await _bcrypt.default.hash(password, salt); // validations will happen here
    // if(newUsers.trim() === '' || newUsers.trim() === null){
    //     res.status(400).json({'message' : "Please make sure you have provided user information"});
    //     return;
    // }

    const newUser = new _Users.default({
      Username,
      Password: hashedPassword,
      Email,
      userId,
      emailIsVerified,
      Fullname
    });
    const savedUser = await newUser.save();
    res.status(200).json({
      savedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "message": "Server error"
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

  try {
    const userDbData = await _Users.default.findOne({
      Email: Email
    });
    const passwordMatch = await _bcrypt.default.compare(Password, userDbData.Password);
    if (!passwordMatch) return res.status(400).json({
      "error": "Wrong password"
    }); // setting token

    const token = _jsonwebtoken.default.sign({
      _id: userDbData._id
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).status(200).json({
      "message": "Logged in"
    });
  } catch (error) {
    console.log(error);
  }
};
/* =========== End:: Login users ========== */


exports.login = login;