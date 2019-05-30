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
        <h3 className="mb-0">Offences</h3>
      </CardHeader>
      <CardBody>
        <div className="text-center mt-2 mb-2">
          Error!
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-exclamation-triangle fa-4x"/>
        </div>
        <div className="text-center mt-2 mb-2">
          Something went wrong. Sad times.
        </div>
      </CardBody>
    </Card>
  );
}