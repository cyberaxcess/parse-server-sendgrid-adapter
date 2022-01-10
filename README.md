# parse-server-sendgrid-adapter
Simple sendgrid adapter for parse server, modified to use the newest SendGrid packages

## Configuration

```
const { ParseServer } = require('parse-server');
const sendGridAdapter = require('parse-server-sendgrid-email-adapter');

const config = {
  ...,
  emailAdapter: sendGridAdapter({
    apiKey: '', // sendgrid api key
    from: 'myApp <info@myApp.com>', // from email address,
    passwordResetEmailTemplate : '', // sendGrid template ID
    verificationEmailTemplate : '' // sendGrid template ID
  })
};

const parseServer = new ParseServer(config);

```

## Adapted From
This adapter has been updated from the uage in:
https://github.com/theashraf/parse-server-sendgrid-email-adapter
