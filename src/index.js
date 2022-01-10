import sgMail from "@sendgrid/mail"
import fs from 'fs';

module.exports = mailOptions => {
  if (!mailOptions || !mailOptions.template) {
    throw 'MailTemplateAdapter requires an adapter';
  }

  const { adapter, apiKey, fromAddress } = mailOptions;

  if (!fromAddress) {
    throw 'MailTemplateAdapter requires a fromAddress';
  }
  if (!apiKey) {
    throw 'MailTemplateAdapter requires a apiKey';
  }

  sgMail.setApiKey(apiKey)

  const customized = {};

  if (mailOptions.template.verification) {
    const { templateId } = mailOptions.template.verification;

    if (!templateId) {
      throw 'MailTemplateAdapter requires a template id';
    }

    customized.sendVerificationEmail = options =>
      sendTemplate({
        link: options.link,
        email: options.user.get('email'),
        username: options.user.get('username'),
        appName: options.appName,
        templateId,
        apiKey,
        fromAddress
      });
  }

  if (mailOptions.template.resetPassword) {
    const { templateId } = mailOptions.template.resetPassword;

    if (!templateId) {
      throw 'MailTemplateAdapter requires a template id';
    }

    customized.sendPasswordResetEmail = options =>
      sendTemplate({
        link: options.link,
        email: options.user.get('email'),
        username: options.user.get('username'),
        appName: options.appName,
        templateId,
        apiKey,
        fromAddress
      });
  }

  return Object.freeze(Object.assign(customized, adapter));
};


function sendTemplate(params) {
  const sendgrid = require('sendgrid')(params.apiKey);
  const { email, link, username, appName, fromAddress, templateId } = params;
  const template_id = templateId;

  const msg = {
    to: email,
    from: fromAddress,
    templateId: template_id,
    dynamic_template_data: {
      username: username,
      link: link,
      appName: appName,
    },
  }
  return sgMail.send(msg)
}