import React from 'react';
import { Mutation } from 'react-apollo';
import { set } from 'lodash/fp';

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
          let oldData = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          let newData = set(
            'server.player.bans',
            oldData.server.player.bans.concat([addBan]),
            oldData
          );

          cache.writeQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            },
            data: newData
          });
        }}
        onError={() => {}}
      >
        {(addBan, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  addBan({
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