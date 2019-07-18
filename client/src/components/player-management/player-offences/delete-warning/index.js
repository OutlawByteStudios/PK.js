import React from 'react';
import { Mutation } from 'react-apollo';
import { set } from 'lodash/fp';

import { PLAYER_OFFENCES } from '../../../../graphql/queries';
import { DELETE_WARNING } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class DeleteWarning extends React.Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_WARNING}
        update={(cache, { data: { deleteWarning }}) => {
          let oldData = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          let newData = set(
            'server.player.warnings',
            oldData.server.player.warnings.filter(
              warning => warning._id !== deleteWarning._id
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
        {(deleteWarning, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  deleteWarning({
                    variables: {
                      ...variables,
                      warningID: this.props.warningID
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

export default DeleteWarning;