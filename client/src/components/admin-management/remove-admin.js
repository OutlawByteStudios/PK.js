import React from 'react';
import { Button } from 'reactstrap';

import Auth from '../../utils/auth';

import { ErrorModal } from '../index';

class RemoveAdmin extends React.Component{
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event){
    event.preventDefault();

    this.props.action({
      serverID: this.props.serverID,
      steamID: this.props.steamID
    });
  }

  render(){
    return (
      <>
        <ErrorModal errors={this.props.errors} />

        <Button
          color="danger"
          size="sm"
          className={(Auth.claim.steamID === this.props.steamID) ? 'disabled' : null}
          onClick={this.onClick}
        >
          {
            (this.props.loading) ? (
              <>
                <i className="fas fa-circle-notch fa-spin" />{" "}
                Loading...
              </>
            ) : (
              <>Remove Admin</>
            )
          }
        </Button>
      </>
    );
  }
}

export default RemoveAdmin;