import React from 'react';

import { 
  Button, 
  Form
} from 'reactstrap';

import SteamUserSelector from '../../misc/steam-user-selector';

class Component extends React.Component{
  state = {
    steamID: ''
  };

  constructor(){
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    this.props.action(this.state);
  }
  
  render(){
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <SteamUserSelector
          steamID={this.state.steamID}
          onChange={steamID => this.setState({ steamID })}
        />
        <Button
          color="primary"
          size="md"
          className="mt-4"
        >
          Add Admin
        </Button>
      </Form>
    );
  }
}

export default Component;