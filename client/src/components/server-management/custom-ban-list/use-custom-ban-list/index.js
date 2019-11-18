import React from 'react';
import { Query, Mutation } from 'react-apollo';

import Auth from '../../../../utils/auth';

import { USE_CUSTOM_BAN_LIST as USE_CUSTOM_BAN_LIST_QUERY } from '../../../../graphql/queries/index';
import { USE_CUSTOM_BAN_LIST as USE_CUSTOM_BAN_LIST_MUTATION } from '../../../../graphql/mutations/index';

import ErrorModal from '../../../misc/modals/error-modal';

class ServerSelectorSelect extends React.Component{
  render(){
    return (
      <Query
        query={USE_CUSTOM_BAN_LIST_QUERY}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <Mutation
              mutation={USE_CUSTOM_BAN_LIST_MUTATION}
              onError={() => {}}
            >
              {(useCustomBanList, { loading, error }) => {
                if(loading) return <p>Loading...</p>;
                if(error) return <ErrorModal errors={error.graphQLErrors} />;

                return (
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      onChange={event => useCustomBanList({
                        variables: {
                          serverID: this.props.serverID,
                          on: event.target.checked
                        }
                      })}
                      checked={data.server.useCustomBanList}
                      disabled={!data.adminPermission.editCustomBanList}
                      id="use-custom-ban-list"
                    />
                    <label className="custom-control-label" htmlFor="use-custom-ban-list">
                      Use Custom Ban List
                    </label>
                  </div>
                )
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default ServerSelectorSelect;