"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 3500;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname,'views','index.html'));
  res.json({
    "msg": "Helloworld 123"
  });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));