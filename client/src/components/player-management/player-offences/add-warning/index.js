import React from 'react';
import { Mutation } from 'react-apollo';

import { PLAYER_OFFENCES } from '../../../../graphql/queries';
import { ADD_WARNING } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class AddWarning extends React.Component {
  render() {
    return (
      <Mutation
        mutation={ADD_WARNING}
        update={(cache, { data: { addWarning }}) => {
          let data = cache.readQuery({
            query: PLAYER_OFFENCES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          data.server.player.warnings = data.server.player.warnings.concat([addWarning]);

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

export default AddWarning;