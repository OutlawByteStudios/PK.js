import React from 'react';
import { Mutation } from 'react-apollo';

import {
  Button
} from 'reactstrap';

import { SERVER_CONTROLLER } from '../../../graphql/queries';
import { STOP_SERVER } from '../../../graphql/mutations';

import ErrorModal from '../../misc/modals/error-modal';

class StopServer extends React.Component{
  render(){
    return (
      <Mutation
        mutation={STOP_SERVER}
        update={(cache, { data: { stopServer }}) => {
          let { server } = cache.readQuery({
            query: SERVER_CONTROLLER,
            variables: {
              serverID: this.props.serverID
            }
          });

          server = {
            ...server,
            ...stopServer
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
        {(stopServer, { loading, error }) => (
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="danger"
              onClick={() => {
                stopServer({
                  variables: {
                    serverID: this.props.serverID
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
                      <i className="fas fa-stop" />{" "}
                      Stop Server
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

export default StopServer;