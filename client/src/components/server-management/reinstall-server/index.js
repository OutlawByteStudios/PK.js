import React from 'react';
import { Mutation } from 'react-apollo';

import { Button } from 'reactstrap';

import { REINSTALL_SERVER } from '../../../graphql/mutations';

import ErrorModal from '../../misc/modals/error-modal';
import Component from './component';

class ReinstallServer extends React.Component{
  render(){
    return (
      <Mutation
        mutation={REINSTALL_SERVER}
        onError={() => {}}
      >
        {(reinstallServer, { loading, error }) => {
          
          if(loading) return (
            <Button
              color="danger"
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
                action={() => reinstallServer({ variables: { serverID: this.props.serverID } })}
              />
            </>

          );
        }}
      </Mutation>
    );
  }
}

export default ReinstallServer;