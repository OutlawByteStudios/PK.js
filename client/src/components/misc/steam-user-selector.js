import React from 'react';
import { withApollo } from 'react-apollo';

import { STEAM_USER_SELECTOR } from '../../graphql/queries';

import AsyncSelect from 'react-select/lib/Async';

class SteamUserSelector extends React.Component {
  constructor(){
    super();
    this.searchUpdate = this.searchUpdate.bind(this);
  }

  async searchUpdate(displayNameLike){
    const { data } = await this.props.client.query({
      query: STEAM_USER_SELECTOR,
      variables: {
        displayNameLike
      },
      fetchPolicy: 'cache-first'
    });

    const options = [];

    for(let steamUser of data.steamUsers){
      options.push({
        value: steamUser.steamID,
        label: steamUser.displayName
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
    let defaultOptions = (this.props.steamID) ? [{ value: this.props.steamID, label: this.props.steamID }] : [];

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
        value={(this.props.steamID) ? { value: this.props.steamID, label: this.props.steamID } : null}
        placeholder="Select a Steam user..."
        onChange={option => this.props.onChange(option.value)}
        isDisabled={this.props.isDisabled}
      />
    );
  }
}

export default withApollo(SteamUserSelector);
