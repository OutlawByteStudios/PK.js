import React from 'react';

import { 
  Button, 
  Form, 
  Input, 
  InputGroup, 
  InputGroupAddon 
} from 'reactstrap';

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
        <InputGroup>
          <Input
            type="text"
            bsSize="sm"
            placeholder="Steam ID"
            value={this.state.steamID}
            onChange={event => this.setState({ steamID: event.target.value })}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              size="sm"
            >
              Add Admin
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

export default Component;