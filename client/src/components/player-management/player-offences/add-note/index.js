import React from 'react';
import { Mutation } from 'react-apollo';

import { PLAYER_OFFENCES } from '../../../../graphql/queries';
import { ADD_NOTE } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';
import ADMIN_PERMISSIONS from "../../../../graphql/queries/admin-management/admin-permissions";

class AddNote extends React.Component {
  render() {
    return (
      <Mutation
        mutation={ADD_NOTE}
        update={(cache, { data: { addNote }}) => {
          let data = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          data.server.player.notes = data.server.player.notes.concat([addNote]);

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

export default AddNote;