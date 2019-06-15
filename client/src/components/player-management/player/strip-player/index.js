import React from 'react';
import { Mutation } from 'react-apollo';

import { STRIP_PLAYER } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class StripPlayer extends React.Component {
  render() {
    return (
      <Mutation
        mutation={STRIP_PLAYER}
        onError={() => {}}
      >
        {(stripPlayer, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  stripPlayer({
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

export default StripPlayer;