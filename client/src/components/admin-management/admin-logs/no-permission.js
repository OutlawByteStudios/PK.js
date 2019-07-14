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
        <div className="text-center mt-2 mb-2">
          No Permission!
        </div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-lock fa-4x"/>
        </div>
        <div className="text-center mt-2 mb-2">
          You do not have permission to view this information.
        </div>
      </CardBody>
    </Card>
  );
}