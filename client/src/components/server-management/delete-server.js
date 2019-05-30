import React from 'react';
import { Button } from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';

import Auth from '../../utils/auth';

import { DangerModal, ErrorModal } from '../index';

class DeleteServer extends React.Component{
  state = {
    confirmation: false
  };

  constructor(){
    super();
    this.onConfirmation = this.onConfirmation.bind(this);
  }

  onConfirmation(){
    this.props.action({
      serverID: this.props.serverID
    });
  }

  render(){
    if(this.props.server) return(
      <Redirect
        to={this.props.match.path.replace('/:serverID', '/')}
      />
    );
    return (
      <>
        {
          this.state.confirmation &&
          (
            <DangerModal
              subText="Deleting a server will delete all players info and server files. It cannot be undone!"
              action={this.onConfirmation}
            />
          )
        }

        <ErrorModal errors={this.props.errors} />

        <Button
          color="danger"
          className={(Auth.claim.steamID === this.props.steamID) ? 'disabled' : null}
          onClick={() => {
            this.setState({ confirmation: true })
          }}
        >
          {
            (this.props.loading) ? (
              <>
                <i className="fas fa-circle-notch fa-spin" />{" "}
                Loading...
              </>
            ) : (
              <>Delete Server</>
            )
          }
        </Button>
      </>
    );
  }
}

export default withRouter(DeleteServer);