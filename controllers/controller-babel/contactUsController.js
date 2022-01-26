"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContact = exports.creatNewContact = void 0;

var _connection = _interopRequireDefault(require("../../connection/connection-babel/connection"));

var _ContactUs = _interopRequireDefault(require("../../models/models-babel/ContactUs.js"));

var _validation = require("../../validation/validation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==================== Start:: imports =================== */

/* ==================== End:: imports =================== */

/* ===== Start:: Inserting new contact ===== */
const creatNewContact = async (req, res) => {
  const {
    error
  } = (0, _validation.contactValidation)(req.body);
  /* ===== Start:: validation ====== */

  if (error) return res.status(400).json({
    "error": error.details[0].message
  });
  /* ===== End:: validation ====== */

  try {
    const {
      comment,
      email,
      subject
    } = req.body;
    const isNewContact = true;
    const newContact = new _ContactUs.default({
      comment,
      email,
      subject,
      isNewContact
    });
    const savedContact = await newContact.save();
    return res.status(200).json({
      "data": savedContact
    });
  } catch (error) {
    return res.status(500).json({
      "error": error.message
    });
  }
};
/* ===== End:: Inserting new contact ===== */

/* ===== Start:: Getting contacts ===== */


exports.creatNewContact = creatNewContact;

const getContact = async (req, res) => {
  const limit = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 3;

  try {
    const contactData = await _ContactUs.default.find({}).limit(limit);
    if (!contactData) return res.status(200).json({
      "data": null
    });
    return res.status(200).json({
      "data": contactData
    });
  } catch (error) {
    res.status(500).json({
      "error": error.message
    });
  }
};
/* ===== End:: Getting contacts ===== */


exports.getContact = getContact;