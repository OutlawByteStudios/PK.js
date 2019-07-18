import React from 'react';
import { Mutation } from 'react-apollo';
import { set } from 'lodash/fp';

import { PLAYER_OFFENCES } from '../../../../graphql/queries';
import { DELETE_NOTE } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class DeleteNote extends React.Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_NOTE}
        update={(cache, { data: { deleteNote }}) => {
          let oldData = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          let newData = set(
            'server.player.notes',
            oldData.server.player.notes.filter(
              note => note._id !== deleteNote._id
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
        {(deleteNote, { loading, error }) => {
          if (loading) return <Loader/>;
          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  deleteNote({
                    variables: {
                      ...variables,
                      noteID: this.props.noteID
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

export default DeleteNote;