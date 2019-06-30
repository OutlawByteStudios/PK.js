import React from 'react';
import { Mutation } from 'react-apollo';

import {
  Button
} from 'reactstrap';

import { SERVER_CONTROLLER } from '../../../graphql/queries';
import { RESTART_SERVER } from '../../../graphql/mutations';

import ErrorModal from '../../misc/modals/error-modal';

class RestartServer extends React.Component{
  render(){
    return (
      <Mutation
        mutation={RESTART_SERVER}
        update={(cache, { data: { restartServer }}) => {
          let { server } = cache.readQuery({
            query: SERVER_CONTROLLER,
            variables: {
              serverID: this.props.serverID
            }
          });

          server = {
            ...server,
            ...restartServer
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
        {(restartServer, { loading, error }) => (
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="warning"
              onClick={() => {
                restartServer({
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
                      <i className="fas fa-redo-alt" />{" "}
                      Restart Server
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

export default RestartServer;