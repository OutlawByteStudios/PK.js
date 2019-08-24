import React from 'react';
import { Mutation } from 'react-apollo';

import { LINKED_PLAYERS } from '../../../graphql/queries';
import { LINK_STEAM_USER } from '../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../misc/modals/error-modal';
import Component from './component';

class LinkSteamUser extends React.Component {
  render() {
    return (
      <Mutation
        mutation={LINK_STEAM_USER}
        update={(cache, { data: { linkSteamUser }}) => {
          let { linkedPlayers } = cache.readQuery({
            query: LINKED_PLAYERS
          });

          linkedPlayers = linkedPlayers.concat([linkSteamUser]);

          cache.writeQuery({
            query: LINKED_PLAYERS,
            data: { linkedPlayers }
          });
        }}
        onError={() => {}}
      >
        {(linkSteamUser, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  linkSteamUser({
                    variables
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

export default LinkSteamUser;