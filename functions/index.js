const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const APP_NAME = 'Embracebook';
const DEFAULT_FROM = `${APP_NAME} <noreply@firebase.com>`;

/**
 * Configure the email transport using the default SMTP transport and a GMail account.
 * For Gmail, enable these:
 *   1. https://www.google.com/settings/security/lesssecureapps
 *   2. https://accounts.google.com/DisplayUnlockCaptcha
 * For other types of transports such as Sendgrid see https://nodemailer.com/transports/
 * TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables:
 *     > firebase functions:config:set gmail.email="foo@gmail.com" gmail.password="1234"
 */
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

admin.initializeApp(functions.config().firebase);

function sendMail(mailOptions) {
  mailOptions.from = mailOptions.from || DEFAULT_FROM;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log(`Email sent to ${mailOptions.to}`);
  });
}

// Sends a welcome email to the given user.
function sendWelcomeEmail(email, displayName) {
  return sendMail({
    to: email,
    subject: `Welcome to ${APP_NAME}!`,
    text: `Hello, ${displayName || ''}. You've been invited to ${APP_NAME}. Log in at https://embracebook.net/`,
  }).then(() => {
    console.log('New welcome email sent to:', email);
  });
}

// Sends a goodbye email to the given user.
function sendGoodbyEmail(email, displayName) {
  return sendMail({
    to: email,
    subject: 'Bye!',
    text: `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`,
  }).then(() => {
    console.log('Account deletion confirmation email sent to:', email);
  });
}

// function encodeID(str) {
//   return str.replace(/[.#$[\]]/g, c => (
//     `%${c.charCodeAt(0).toString(16)}`
//   ));
// }

exports.createdUser = functions.auth.user().onCreate((event) => {
  const user = event.data;
  const { email, displayName } = user;

  return sendWelcomeEmail(email, displayName);
});

exports.deletedUser = functions.auth.user().onDelete((event) => {
  const user = event.data;
  const { email, displayName } = user;

  return sendGoodbyEmail(email, displayName);
});

// exports.createUser = functions.auth.user().onCreate(({ data }) => {
//   const { email, uid } = data;

//   const inviteRef = admin.database().ref(`/invites/${encodeID(email)}`);

//   return inviteRef.once('value').then((snapshot) => {
//     const data = snapshot.val();

//     if (!data) {
//       console.info(`No existing invite found for ${email}`);
//       return;
//     }

//     // user has been invited
//     if (data) {
//       // push new /users node with existing invite data
//       const usersRef = admin.database().ref('/users/');
//       usersRef.child(uid).set(data);

//       // delete existing /invites node
//       inviteRef.remove();

//       console.info(`Successfully redeemed invite for ${email}`);
//     }
//   });
// });

exports.newProfile = functions.database.ref('/profiles/').onCreate((event) => {
  const { data, auth } = event;

  return data.ref.update({ createdBy: auth });
});
