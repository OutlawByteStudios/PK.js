import React from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";
import ErrorModal from "../utils/error-modal";

class AddAdmin extends React.Component{
  constructor(){
    super();

    this.steamID = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    this.props.action({
      serverID: this.props.serverID,
      steamID: this.steamID.current.value,
    });

    this.steamID.current.value = "";
  }

  render(){
    if(this.props.loading) return (
      <div className="text-center">
        <i className="fas fa-circle-notch fa-spin" />{" "}
        Loading...
      </div>
    );

    return (
      <>
        {
          this.props.errors &&
          <ErrorModal errors={this.props.errors} />
        }

        <Form
          onSubmit={this.onSubmit}
        >
          <InputGroup>
            <Input
              type="text"
              bsSize="sm"
              placeholder="Steam ID"
              innerRef={this.steamID}
            />
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                size="sm"
              >Add Admin</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </>
    );
  }
}

export default AddAdmin;