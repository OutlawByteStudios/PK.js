import React from 'react';
import { Mutation } from 'react-apollo';

import { CREATE_SERVER } from '../../mutations';

import { CreateServer as CreateServerBase } from '../../../components';

class CreateServer extends React.Component{
  render(){
    return (
      <Mutation
        mutation={CREATE_SERVER}
        onError={() => {}}
      >
        {(createServer, { data, loading, error }) => (
          <CreateServerBase
            action={variables => createServer({ variables })}
            server={(data) ? data.createServer : undefined}
            loading={loading}
            errors={(error) ? error.graphQLErrors: error}
            {...this.props}
          />
        )}
      </Mutation>
    );
  }
}

export default CreateServer;