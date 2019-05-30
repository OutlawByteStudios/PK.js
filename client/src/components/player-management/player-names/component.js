import React from 'react';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";

class Component extends React.Component {
  state = {
    tab: 'Bans'
  };

  constructor(){
    super();
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(tab){
    this.setState({ tab });
  }

  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Player Names</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            this.props.names.map((name, key) => (
              <Badge color="primary" key={key}>{name.name}</Badge>
            ))
          }
        </CardBody>
      </Card>
    );
  }
}

export default Component;