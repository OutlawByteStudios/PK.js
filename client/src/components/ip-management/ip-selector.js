import React from 'react';
import { withApollo } from 'react-apollo';

import { IP_SEARCH } from '../../graphql/queries/index';

import AsyncSelect from 'react-select/lib/Async';

class PlayerSelector extends React.Component {
  constructor(){
    super();
    this.searchUpdate = this.searchUpdate.bind(this);
  }

  async searchUpdate(search){
    const { data } = await this.props.client.query({
      query: IP_SEARCH,
      variables: {
        serverID: this.props.serverID,
        search
      },
      fetchPolicy: 'cache-first'
    });

    return data.server.ipRecords.map(record => ({ value: record.ipMask, label: `ID: #${record.ipMask}, IP: ${record.ip || '***.***.***.***'}`}));
  }

  render() {
    let defaultOptions = (this.props.ipMask) ? [{ value: this.props.ipMask, label: 'ID: #' + this.props.ipMask }] : [];

    return (
      <AsyncSelect
        className="form-control-alternative"
        loadOptions={this.searchUpdate}
        defaultOptions={defaultOptions}
        value={(this.props.ipMask) ? { value: this.props.ipMask, label: 'ID: #' + this.props.ipMask } : null}
        placeholder="Select an IP..."
        onChange={option => this.props.onChange(option.value)}
      />
    );
  }
}

export default withApollo(PlayerSelector);
