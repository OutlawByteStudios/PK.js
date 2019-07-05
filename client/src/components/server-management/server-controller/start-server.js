import React from 'react';
import { Mutation } from 'react-apollo';

import {
  Button
} from 'reactstrap';

import { SERVER_CONTROLLER } from '../../../graphql/queries';
import { START_SERVER } from '../../../graphql/mutations';

import ErrorModal from '../../misc/modals/error-modal';

class StartServer extends React.Component{
  render(){
    return (
      <Mutation
        mutation={START_SERVER}
        update={(cache, { data: { startServer }}) => {
          let { server } = cache.readQuery({
            query: SERVER_CONTROLLER,
            variables: {
              serverID: this.props.serverID
            }
          });

          server = {
            ...server,
            ...startServer
          };

          cache.writeQuery({
            query: SERVER_CONTROLLER,
            variables: {
              serverID: this.props.serverID
            },
            data: { server },
          });
        }}
        onError={() => {}}
      >
        {(startServer, { loading, error }) => (
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="success"
              onClick={() => {
                startServer({
                  variables: {
                    serverID: this.props.serverID,
                    module: this.props.module,
                    config: this.props.config
                  }
                })
              }}
            >
              {
                (loading) ?
                  (
                    <>
                      <i className="fas fa-circle-notch fa-spin" />{" "}
                      Loading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-play" />{" "}
                      Start Server
                    </>
                  )
              }
            </Button>
          </>
        )}
      </Mutation>
    );
  }
}

export default StartServer;