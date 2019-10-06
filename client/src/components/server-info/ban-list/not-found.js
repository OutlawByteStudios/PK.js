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
        <h3 className="mb-0">Ban List</h3>
      </CardHeader>
      <CardBody>
        <div className="text-center mt-2 mb-2">
          Not Found!
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-question fa-4x"/>
        </div>
        <div className="text-center mt-2 mb-2">
          This information doesn't not appear to exist.
        </div>
      </CardBody>
    </Card>
  );
}