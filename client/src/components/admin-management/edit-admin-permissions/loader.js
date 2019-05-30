import React from 'react';

import {
  Card,
  CardBody
} from 'reactstrap';

export default function() {
  return (
    <Card>
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