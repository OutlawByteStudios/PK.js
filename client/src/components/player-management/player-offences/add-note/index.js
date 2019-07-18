import React from 'react';
import { Mutation } from 'react-apollo';
import { set } from 'lodash/fp';

import { PLAYER_OFFENCES } from '../../../../graphql/queries';
import { ADD_NOTE } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class AddNote extends React.Component {
  render() {
    return (
      <Mutation
        mutation={ADD_NOTE}
        update={(cache, { data: { addNote }}) => {
          let oldData = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          let newData = set(
            'server.player.notes',
            oldData.server.player.notes.concat([addNote]),
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

export default AddNote;