import React from 'react';
import { Mutation } from 'react-apollo';
import { set } from 'lodash/fp';

import {
  Button
} from 'reactstrap';

import { PLAYER_NAMES } from '../../../../graphql/queries';
import { WIPE_PLAYER_NAME } from '../../../../graphql/mutations';

import ErrorModal from '../../../misc/modals/error-modal';

class WipeName extends React.Component{
  render(){
    return (
      <Mutation
        mutation={WIPE_PLAYER_NAME}
        update={(cache, { data: { wipePlayerName }}) => {
          let oldData = cache.readQuery({
            query: PLAYER_NAMES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            }
          });

          let newData = set(
            'server.player.playerNames',
            oldData.server.player.playerNames.filter(
              name => name._id !== wipePlayerName._id
            ),
            oldData
          );

          cache.writeQuery({
            query: PLAYER_NAMES,
            variables: {
              serverID: this.props.serverID,
              guid: this.props.guid
            },
            data: newData
          });
        }}
        onError={() => {}}
      >
        {(wipePlayerName, { loading, error }) => (
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="default"
              className="btn-white"
              onClick={() => {
                wipePlayerName({
                  variables: {
                    serverID: this.props.serverID,
                    name: this.props.name
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
                    <>Wipe Player Name</>
                  )
              }
            </Button>
          </>
        )}
      </Mutation>
    );
  }
}

export default WipeName;