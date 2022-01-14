"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.selectAllUsers = exports.login = exports.getSpacificUser = exports.createNewUser = void 0;

var _connection = _interopRequireDefault(require("../../connection/connection-babel/connection"));

var _Users = _interopRequireDefault(require("../../models/models-babel/Users"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==================== Start:: imports =================== */
_dotenv.default.config();
/* ==================== End:: imports ==================== */

/* ==================== Start:: Valiadation ==================== */


const loginValidation = formData => {
  const schema = _joi.default.object({
    Email: _joi.default.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }).required().messages({
      'string.empty': `"a" cannot be an empty field`
    }),
    Password: _joi.default.string().required()
  });

  try {
    const value = schema.validate(formData, {
      abortEarly: false
    });
    return value;
  } catch (error) {
    console.log(error);
  }
};

const registerValidation = formData => {
  const schema = _joi.default.object({
    Email: _joi.default.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }).required().messages({
      'string.empty': `"a" cannot be an empty field`
    }),
    password: _joi.default.string().min(6).alphanum().required(),
    Username: _joi.default.string().min(6).required(),
    Fullname: _joi.default.string().min(5).required()
  });

  try {
    const value = schema.validate(formData, {
      abortEarly: false
    });
    return value;
  } catch (error) {
    console.log(error);
  }
};

const updateValidation = formData => {
  const schema = _joi.default.object({
    Email: _joi.default.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }).messages({
      'string.empty': `"a" cannot be an empty field`
    }),
    Username: _joi.default.string().min(6),
    Fullname: _joi.default.string().min(5)
  });

  try {
    const value = schema.validate(formData, {
      abortEarly: false
    });
    return value;
  } catch (error) {
    console.log(error);
  }
};
/* ==================== End:: Valiadation ==================== */

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
  const {
    Username,
    password,
    Email,
    Fullname
  } = req.body;
  const emailIsVerified = false;
  const {
    error
  } = registerValidation({
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
      "userId": savedUser._id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "error": "Server error"
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
  } = loginValidation({
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

/* ============ Start:: Update Blog  ============= */


exports.login = login;

const updateUser = async (req, res) => {
  const {
    Username,
    Email,
    Fullname
  } = req.body;
  const {
    error
  } = updateValidation({
    Email,
    Username,
    Fullname
  });
  if (error) return res.status(400).json({
    "error": error.details[0].message
  });

  try {
    let id = req.user._id;
    let updated = await _Users.default.findOneAndUpdate({
      _id: id
    }, {
      $set: req.body
    });

    if (updated) {
      const updateInfo = await _Users.default.findOne({
        _id: id
      });
      const resUsername = updateInfo.Username;
      const resEmail = updateInfo.Email;
      const resFullname = updateInfo.Username;
      res.status(200).json({
        "message": "Updated",
        "data": {
          Username: resUsername,
          Email: resEmail,
          Fullname: resFullname
        }
      });
      return;
    } else {
      res.status(500).json({
        "error": 'Please try again'
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "error": "Server error"
    });
  }
};
/* ============== End:: Update Blog  ============= */


exports.updateUser = updateUser;