import React from 'react';
import { Query } from 'react-apollo';

import Auth from '../../../utils/auth';

import { OWN_ADMIN_PERMISSIONS } from '../../../graphql/queries';

import Component from './component';

class ServerSelectorSelect extends React.Component{
  render(){
    return (
      <Query
        query={OWN_ADMIN_PERMISSIONS}
        variables={{ steamID: Auth.claim.steamID }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <Component
              adminPermissions={data.adminPermissions}
            />
          );
        }}
      </Query>
    );
  }
}

export default ServerSelectorSelect;