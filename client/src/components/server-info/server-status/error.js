import React from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";

export default function() {
  return (
    <Card className="card-stats mb-4 mb-lg-0">
      <CardBody>
        <Row>
          <Col>
            <CardTitle className="text-uppercase text-muted mb-0">
              Unknown Server
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">
              Error Fetching Status
            </span>
          </Col>
          <Col className="col-auto">
            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
              <i className="fas fa-exclamation" />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}