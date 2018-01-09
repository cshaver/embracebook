import React from 'react';

import TextInput from 'embracebook/components/form/TextInput';

class Invite extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextInput type="email" label="Email" />
          <label htmlFor="storyteller">Storyteller?<input type="checkbox" id="storyteller" name="storyteller" /></label>
          <label htmlFor="player">Player?<input type="checkbox" id="player" name="player" /></label>
          <label htmlFor="admin">Admin?<input type="checkbox" id="admin" name="admin" /></label>

          <button type="submit">Invite</button>
        </form>
      </div>
    );
  }
}

export default Invite;
