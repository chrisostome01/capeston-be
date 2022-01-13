"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _authenticate = _interopRequireDefault(require("../../middlewares/middlewares-babel/authenticate.js"));

var blog = _interopRequireWildcard(require("../../controllers/controller-babel/blogController.js"));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const router = _express.default.Router();

router.use(_bodyParser.default.json());
router.use(_bodyParser.default.urlencoded({
  extended: false
}));
/* ========== Start:: Getting  All blogs ======== */

router.get('/', _authenticate.default, blog.getAllBlogs);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */

router.get('/:blogId', blog.getSpacificBlog);
/* =========== End:: Getting  Spacific blog ========= */

/* ========== Start:: Create blog ======== */

router.post('/create', blog.createNewblog);
/* =========== End:: Create blog ========= */

/* ========== Start:: Delete blog ======== */

router.delete('/delete', blog.deleteBlog);
/* =========== End:: Delete blog ========= */

/* ========== Start:: Create blog ======== */

router.put('/update', blog.updateBlog);
/* =========== End:: Create blog ========= */

var _default = router;
exports.default = _default;