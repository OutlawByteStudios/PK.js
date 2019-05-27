import React from 'react';
import { withApollo } from 'react-apollo';

import { PLAYER_SEARCH } from '../../queries';

import { PlayerSelector as PlayerSelectorBase } from '../../../components';

class PlayerSelector extends React.Component {
  constructor(){
    super();
    this.searchUpdate = this.searchUpdate.bind(this);
  }

  async searchUpdate(variables){
    return this.props.client.query({
      query: PLAYER_SEARCH,
      variables
    });
  }

  render() {
    return (
      <PlayerSelectorBase
        searchUpdate={this.searchUpdate}
        {...this.props}
      />
    );
  }
}

export default withApollo(PlayerSelector);
