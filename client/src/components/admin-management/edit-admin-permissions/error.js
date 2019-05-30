import React from 'react';

import {
  Card,
  CardBody
} from 'reactstrap';

export default function() {
  return (
    <Card>
      <CardBody>
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
      </CardBody>
    </Card>
  );
}