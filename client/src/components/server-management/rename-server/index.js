import React from 'react';
import { Mutation } from 'react-apollo';

import { RENAME_SERVER } from '../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../misc/modals/error-modal';
import Component from './component';

class RenameServer extends React.Component {
  render() {
    return (
      <Mutation
        mutation={RENAME_SERVER}
        onError={() => {}}
      >
        {(renameServer, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  renameServer({
                    variables: {
                      ...variables,
                      serverID: this.props.serverID,
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

export default RenameServer;