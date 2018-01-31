const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const uuid = require('uuid/v1');

const CONFIG = functions.config();
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
const gmailEmail = CONFIG.gmail.email;
const gmailPassword = CONFIG.gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

admin.initializeApp(CONFIG.firebase);

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
    text: `Hello, ${displayName || ''}. You've been invited to ${APP_NAME}. Log in at https://embracebook.net/login`,
  }).then(() => {
    console.log('New welcome email sent to:', email);
  });
}

// Sends a goodbye email to the given user.
function sendGoodbyeEmail(email, displayName) {
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

exports.invitedUser = functions.database.ref('/invites/').onCreate((event) => {
  const data = event.data.val();
  const inviteRef = data.adminRef;
  const {
    email,
    roles,
    createdBy,
    createdAt,
  } = data;
  const password = uuid();

  console.log('data', data);
  console.log('key', event.data.key);
  console.log('email', email);
  console.log('temp password', password);

  if (!email) {
    console.log('No email provided');
    return;
  }

  admin.auth().createUser({
    email,
    password,
  })
    .then((userRecord) => {
      const { uid } = userRecord;
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', uid);

      const profile = {
        roles,
        createdBy,
        createdAt,
      };

      // push new /users node with existing invite data
      const usersRef = admin.database().ref('/users/');
      usersRef.child(uid).set(profile)
        .then(() => {
          console.info(`Successfully set profile with roles for ${email}`);
          // delete existing /invites node
          inviteRef.remove()
            .then(() => {
              console.info(`Successfully migrated invite for ${email}`);
            })
            .catch((error) => {
              console.log('Error removing invite:', error);
            });
        })
        .catch((error) => {
          console.log('Error creating user profile:', error);
        });
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
});

exports.createdUser = functions.auth.user().onCreate((event) => {
  const user = event.data;
  const { email, displayName } = user;

  return sendWelcomeEmail(email, displayName);
});

exports.deletedUser = functions.auth.user().onDelete((event) => {
  const user = event.data;
  const { email, displayName } = user;

  return sendGoodbyeEmail(email, displayName);
});
