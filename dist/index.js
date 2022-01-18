"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverExport = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoutes = _interopRequireDefault(require("../routes/routes-babel/userRoutes.js"));

var _blogRoute = _interopRequireDefault(require("../routes/routes-babel/blogRoute.js"));

var _contactUsRoute = _interopRequireDefault(require("../routes/routes-babel/contactUsRoute.js"));

var _commentRoute = _interopRequireDefault(require("../routes/routes-babel/commentRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 3500;
/* ===== Start:: user routes ========== */

app.use('/api/v1/user', _userRoutes.default);
/* ===== End:: user routes ============ */

/* ===== Start:: blog routes ========== */

app.use('/api/v1/blog', _blogRoute.default);
/* ===== End:: blog routes ============ */

/* ===== Start:: blog routes ========== */

app.use('/api/v1/contact', _contactUsRoute.default);
/* ===== End:: blog routes ============ */

/* ===== Start:: comment routes ========== */

app.use('/api/v1/comment', _commentRoute.default);
/* ===== End:: comment routes ============ */

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const serverExport = () => {
  return app;
};

exports.serverExport = serverExport;