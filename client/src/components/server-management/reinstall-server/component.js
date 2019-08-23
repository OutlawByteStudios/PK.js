import React from 'react';
import { Button } from 'reactstrap';

import DangerModal from '../../misc/modals/danger-modal';

class Component extends React.Component{
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
              subText="Reinstalling a server will delete server files and copy files back from the default server directory. It cannot be undone!"
              action={this.props.action}
              onClose={() => {this.setState({ confirmation: false})}}
            />
          )
        }

        <Button
          color="danger"
          onClick={() => {this.setState({ confirmation: true })}}
        >
          Reinstall Server
        </Button>
      </>
    );
  }
}

export default Component;