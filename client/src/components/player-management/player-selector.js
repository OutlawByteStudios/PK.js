import React from 'react';
import { withApollo } from 'react-apollo';

import { PLAYER_SEARCH } from '../../graphql/queries';

import AsyncSelect from 'react-select/lib/Async';

class PlayerSelector extends React.Component {
  constructor(){
    super();
    this.searchUpdate = this.searchUpdate.bind(this);
  }

  async searchUpdate(search){
    const { data } = await this.props.client.query({
      query: PLAYER_SEARCH,
      variables: {
        serverID: this.props.serverID,
        search
      },
      fetchPolicy: 'cache-first'
    });

    const options = [];

    for(let playerName of data.server.playerNames){
      options.push({
        value: playerName.player.guid,
        label: 'Name: ' + playerName.name
      });
    }

    for(let player of data.server.players){
      options.push({
        value: player.guid,
        label: 'GUID: ' + player.guid
      });
    }

    if(this.props.allowNone){
      options.push({
        value: '',
        label: 'None'
      });
    }

    return options;
  }

  render() {
    let defaultOptions = (this.props.player) ? [{ value: this.props.player, label: 'GUID: ' + this.props.player }] : [];

    if(this.props.allowNone){
      defaultOptions.push({
        value: '',
        label: 'None'
      });
    }


    return (
      <AsyncSelect
        className="form-control-alternative"
        loadOptions={this.searchUpdate}
        defaultOptions={defaultOptions}
        value={(this.props.player) ? { value: this.props.player, label: 'GUID: ' + this.props.player } : null}
        placeholder="Select a player..."
        onChange={option => this.props.onChange(option.value)}
        isDisabled={this.props.isDisabled}
      />
    );
  }
}

export default withApollo(PlayerSelector);
