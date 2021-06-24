"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import SendGrid from 'sendgrid';
var SimpleSendGridAdapter = function SimpleSendGridAdapter(mailOptions) {
  if (!mailOptions || !mailOptions.apiKey || !mailOptions.fromAddress) {
    throw 'SimpleSendGridAdapter requires an API Key.';
  } //let sendgrid = SendGrid(mailOptions.apiKey);


  _mail["default"].setApiKey(mailOptions.apiKey);

  var msg = {
    to: to,
    // Change to your recipient
    from: mailOptions.fromAddress,
    // Change to your verified sender
    subject: subject,
    text: text //html: '<strong>and easy to do anywhere, even with Node.js</strong>',

  };
  /*let sendMail = ({to, subject, text}) => {
    return new Promise((resolve, reject) => {
      sendgrid.send({
        from: mailOptions.fromAddress,
        to: to,
        subject: subject,
        text: text,
      }, function(err, json) {
        if (err) {
           reject(err);
        }
        resolve(json);
      });
    });
  }*/

  var sendMail = _mail["default"].send(msg).then(function (response) {
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  })["catch"](function (error) {
    console.error(error);
  });

  return Object.freeze({
    sendMail: sendMail
  });
};

var _default = SimpleSendGridAdapter;
exports["default"] = _default;
