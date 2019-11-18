import React from 'react';

import { Col, Input, Row } from "reactstrap";

import SaveCustomBanList from './save-changes';

class Component extends React.Component {
  constructor(props){
    super();
    this.state = {
      customBanList: props.customBanList
    };
  }

  render(){
    return (
      <>
        <Input
          type="textarea"
          className="form-control-alternative"
          rows="10"
          value={this.state.customBanList}
          onChange={event => this.setState({ customBanList: event.target.value })}
        />
        <Row className="text-center mt-4">
          <Col>
            <SaveCustomBanList
              serverID={this.props.serverID}
              customBanList={this.state.customBanList}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Component;