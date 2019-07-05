import React from 'react';
import { Mutation } from 'react-apollo';

import { Button } from 'reactstrap';

import { CLEAR_PLAYER_LOCATIONS } from '../../../graphql/mutations';

import ErrorModal from '../../misc/modals/error-modal';
import Component from './component';

class ClearPlayerLocations extends React.Component{
  render(){
    return (
      <Mutation
        mutation={CLEAR_PLAYER_LOCATIONS}
        onError={() => {}}
      >
        {(clearPlayerLocations, { loading, error }) => {
          
          if(loading) return (
            <Button
              color="warning"
            >
              <i className="fas fa-circle-notch fa-spin" />{" "}
              Loading...
            </Button>
          );

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors} />
              }
              <Component
                action={() => clearPlayerLocations({ variables: { serverID: this.props.serverID } })}
              />
            </>

          );
        }}
      </Mutation>
    );
  }
}

export default ClearPlayerLocations;