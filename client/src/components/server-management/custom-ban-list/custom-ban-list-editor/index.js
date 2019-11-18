import React from 'react';
import { Query } from 'react-apollo';

import { CUSTOM_BAN_LIST } from '../../../../graphql/queries';

import Auth from '../../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

class CustomBanListEditor extends React.Component{
  render(){
    return (
      <Query
        query={CUSTOM_BAN_LIST}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error/>;

          if(data.adminPermission.editCustomBanList === 0) return <NoPermission/>;

          return (
            <Component
              serverID={this.props.serverID}
              customBanList={data.server.customBanList}
            />
          );
        }}
      </Query>
    );
  }
}

export default CustomBanListEditor;