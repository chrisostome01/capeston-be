"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoutes = _interopRequireDefault(require("../routes/routes-babel/userRoutes.js"));

var _blogRoute = _interopRequireDefault(require("../routes/routes-babel/blogRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 3500;
/* ===== Start:: user routes ========== */

app.use('/api/v1/user', _userRoutes.default);
/* ===== End:: user routes ============ */

/* ===== Start:: blog routes ========== */

app.use('/api/v1/blog', _blogRoute.default);
/* ===== End:: blog routes ============ */

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));