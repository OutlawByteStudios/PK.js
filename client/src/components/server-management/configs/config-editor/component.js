import React from 'react';

import { Col, Input, Row } from "reactstrap";

import SaveServerConfig from './save-changes';

class Component extends React.Component {
  constructor(props){
    super();
    this.state = {
      config: props.config
    };
  }

  render(){
    return (
      <>
        <Input
          type="textarea"
          className="form-control-alternative"
          rows="30"
          value={this.state.config}
          onChange={event => this.setState({ config: event.target.value })}
        />
        <Row className="text-center mt-4">
          <Col>
            <SaveServerConfig
              serverID={this.props.serverID}
              name={this.props.name}
              config={this.state.config}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Component;