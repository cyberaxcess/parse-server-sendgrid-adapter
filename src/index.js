//import SendGrid from 'sendgrid';
import sgMail from '@sendgrid/mail';

let SimpleSendGridAdapter = mailOptions => {
    if (!mailOptions || !mailOptions.apiKey || !mailOptions.fromAddress) {
        throw 'SimpleSendGridAdapter requires an API Key.';
    }
    //let sendgrid = SendGrid(mailOptions.apiKey);
    sgMail.setApiKey(mailOptions.apiKey);

    const msg = {
        to: to, // Change to your recipient
        from: mailOptions.fromAddress, // Change to your verified sender
        subject: subject,
        text: text
        //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

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

    let sendMail = sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        });

    return Object.freeze({
        sendMail: sendMail
    });
}

module.exports = SimpleSendGridAdapter;
