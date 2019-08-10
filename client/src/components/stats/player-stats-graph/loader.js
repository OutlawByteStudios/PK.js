import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';

export default function(props) {
  return (
    <Card className="bg-gradient-default shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <Col>
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Player Stats
            </h6>
            <h2 className="text-white mb-0">{props.statName}</h2>
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
}