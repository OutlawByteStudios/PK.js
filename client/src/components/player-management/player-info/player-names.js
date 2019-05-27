import React from 'react';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

class PlayerNames extends React.Component {
  render() {
    if (this.props.loading) return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Player Names</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="text-center mt-2 mb-3">
            Loading...
          </div>
          <div className="btn-wrapper text-center">
            <i className="fas fa-circle-notch fa-spin fa-4x" />
          </div>
        </CardBody>
      </Card>
    );

    if (this.props.errors) return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Player Names</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="text-center mt-2 mb-3">
            Something went wrong!
          </div>
          <div className="btn-wrapper text-center">
            <i className="fas fa-exclamation-triangle fa-4x" />
          </div>
        </CardBody>
      </Card>
    );

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

export default PlayerNames;