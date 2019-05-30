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
        <h3 className="mb-0">Create Server</h3>
      </CardHeader>
      <CardBody>
        <CardBody>
          <div className="text-center mt-2 mb-3">
            Loading...
          </div>
          <div className="btn-wrapper text-center">
            <i className="fas fa-circle-notch fa-spin fa-4x" />
          </div>
          <div className="text-center mt-3 mb-3">
            This may take a few minutes.
          </div>
        </CardBody>
      </CardBody>
    </Card>
  );
}