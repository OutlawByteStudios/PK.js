import React from 'react';
import { Button } from 'reactstrap';

import WarningModal from '../../misc/modals/warning-modal';

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
            <WarningModal
              subText="This will remove all player locations so they spawn in their faction's spawn point."
              action={this.props.action}
              onClose={() => {this.setState({ confirmation: false})}}
            />
          )
        }

        <Button
          color="warning"
          onClick={() => {this.setState({ confirmation: true })}}
        >
          Clear Player Locations
        </Button>
      </>
    );
  }
}

export default DeleteServer;