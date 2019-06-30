import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_MODULES } from '../../../graphql/queries';

import Loader from './loader';
import Component from './component';

class ModuleSelector extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_MODULES}
        variables={{
          serverID: this.props.serverID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <p>Error</p>;

          return (
            <Component
              modules={data.server.modules}
              selectedModule={this.props.selectedModule}
              onChange={this.props.onChange}
              disabled={this.props.disabled}
            />
          );
        }}
      </Query>
    );
  }
}

export default ModuleSelector;