"use strict";

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import SendGrid from 'sendgrid';
var SimpleSendGridAdapter = function SimpleSendGridAdapter(mailOptions) {
  if (!mailOptions || !mailOptions.apiKey || !mailOptions.fromAddress) {
    throw 'SimpleSendGridAdapter requires an API Key.';
  }

  _mail["default"].setApiKey(mailOptions.apiKey);

  var sendMail = function sendMail(_ref) {
    var to = _ref.to,
        subject = _ref.subject,
        text = _ref.text;
    var msg = {
      to: to,
      // Change to your recipient
      from: mailOptions.fromAddress,
      // Change to your verified sender
      subject: subject,
      text: text //html: '<strong>and easy to do anywhere, even with Node.js</strong>',

    };
    return _mail["default"].send(msg).then(function (response) {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })["catch"](function (error) {
      console.error(error);
    });
  };

  return Object.freeze({
    sendMail: sendMail
  });
};

module.exports = SimpleSendGridAdapter;
