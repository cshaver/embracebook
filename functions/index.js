const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

function encodeID(str) {
  return str.replace(/[.#$[\]]/g, c => (
    `%${c.charCodeAt(0).toString(16)}`
  ));
}

exports.createUser = functions.auth.user().onCreate(({ data }) => {
  const { email, uid } = data;

  const inviteRef = admin.database().ref(`/invites/${encodeID(email)}`);

  return inviteRef.once('value').then((snapshot) => {
    const data = snapshot.val();

    if (!data) {
      console.info(`No existing invite found for ${email}`);
      return;
    }

    // user has been invited
    if (data) {
      // push new /users node with existing invite data
      const usersRef = admin.database().ref('/users/');
      usersRef.child(uid).set(data);

      // delete existing /invites node
      inviteRef.remove();

      console.info(`Successfully redeemed invite for ${email}`);
    }
  });
});

exports.newProfile = functions.database.ref('/profiles/').onCreate((event) => {
  const { data, auth } = event;

  return data.ref.update({ createdBy: auth });
});
