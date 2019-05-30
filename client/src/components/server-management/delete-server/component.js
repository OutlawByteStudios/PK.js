import React from 'react';
import { Button } from 'reactstrap';

import DangerModal from '../../misc/modals/danger-modal';

class DeleteServer extends React.Component{
  state = {
    confirmation: false
  };

  render(){
    return (
      <>
        {
          this.state.confirmation &&
          (
            <DangerModal
              subText="Deleting a server will delete all players info and server files. It cannot be undone!"
              action={this.props.action}
              onClose={() => {this.setState({ confirmation: false})}}
            />
          )
        }

        <Button
          color="danger"
          onClick={() => {this.setState({ confirmation: true })}}
        >
          Delete Server
        </Button>
      </>
    );
  }
}

export default DeleteServer;