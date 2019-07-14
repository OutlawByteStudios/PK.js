import React from 'react';

import {
  Input
} from "reactstrap";

export default function() {
  return (
    <Input
      type="select"
      disabled
    >
      <option className="text-default" value={null}>You do not have permission to view configs...</option>
    </Input>
  );
}