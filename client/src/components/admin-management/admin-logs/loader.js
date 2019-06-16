import React from 'react';

import {
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';

export default function() {
  return (
    <Card>
      <CardHeader>
        <h3 className="mb-0">Admin Logs</h3>
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