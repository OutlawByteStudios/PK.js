import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';

import UseCustomBanList from '../use-custom-ban-list';
import CustomBanListEditor from '../custom-ban-list-editor';

class CustomBanListManager extends React.Component{
  render(){
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Custom Ban List</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col>
              <UseCustomBanList
                serverID={this.props.serverID}
              />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <CustomBanListEditor
                serverID={this.props.serverID}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default CustomBanListManager;