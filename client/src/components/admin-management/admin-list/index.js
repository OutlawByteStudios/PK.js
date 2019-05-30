import React from 'react';
import { Query } from 'react-apollo';

import { ADMIN_PERMISSIONS } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class AdminList extends React.Component{
  render(){
    return (
      <Query
        query={ADMIN_PERMISSIONS}
        variables={{
          serverID: this.props.serverID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          return (
            <Component
              adminPermissions={data.adminPermissions}
              currentSelectedSteamID={this.props.currentSelectedSteamID}
              serverID={this.props.serverID}
            />
          );
        }}
      </Query>
    );
  }
}

export default AdminList;