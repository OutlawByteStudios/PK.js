import React from 'react';
import { Mutation } from 'react-apollo';
import { set } from 'lodash/fp';

import { PLAYER_OFFENCES } from '../../../../graphql/queries';
import { DELETE_BAN } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class DeleteBan extends React.Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_BAN}
        update={(cache, { data: { deleteBan }}) => {
          let oldData = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          let newData = set(
            'server.player.bans',
            oldData.server.player.bans.filter(
              ban => ban._id !== deleteBan._id
            ),
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
        {(deleteBan, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  deleteBan({
                    variables: {
                      ...variables,
                      banID: this.props.banID
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

export default DeleteBan;