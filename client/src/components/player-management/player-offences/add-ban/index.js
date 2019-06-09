import React from 'react';
import { Mutation } from 'react-apollo';

import { PLAYER_OFFENCES } from '../../../../graphql/queries';
import { ADD_BAN } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class AddBan extends React.Component {
  render() {
    return (
      <Mutation
        mutation={ADD_BAN}
        update={(cache, { data: { addBan }}) => {
          let data = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          data.server.player.bans = data.server.player.bans.concat([addBan]);

          cache.writeQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            },
            data
          });
        }}
        onError={() => {}}
      >
        {(addNote, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  addNote({
                    variables: {
                      ...variables,
                      serverID: this.props.serverID,
                      guid: this.props.guid
                    }
                  });
                }}
              />
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default AddBan;