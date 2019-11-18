import React from 'react';
import { Mutation } from 'react-apollo';

import {
  Button
} from 'reactstrap';

import { SERVER_CONFIG } from '../../../../../graphql/queries';
import { SAVE_SERVER_CONFIG } from '../../../../../graphql/mutations';

import ErrorModal from '../../../../misc/modals/error-modal';

class SaveServerConfig extends React.Component{
  render(){
    return (
      <Mutation
        mutation={SAVE_SERVER_CONFIG}
        update={(cache, { data: { saveServerConfig }}) => {
          let serverConfig = cache.readQuery({
            query: SERVER_CONFIG,
            variables: {
              serverID: this.props.serverID,
              name: this.props.name
            }
          });

          if(serverConfig.server.serverConfigFile === null) return;

          serverConfig.server.serverConfigFile.config = saveServerConfig.config;

          cache.writeQuery({
            query: SERVER_CONFIG,
            variables: {
              serverID: this.props.serverID,
              name: this.props.name
            },
            data: serverConfig,
          });
        }}
        onError={() => {}}
      >
        {(saveServerConfig, { loading, error }) => (
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="primary"
              onClick={() => {
                saveServerConfig({
                  variables: {
                    serverID: this.props.serverID,
                    name: this.props.name,
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
                    <>Save Changes</>
                  )
              }
            </Button>
          </>
        )}
      </Mutation>
    );
  }
}

export default SaveServerConfig;