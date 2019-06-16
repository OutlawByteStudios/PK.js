import React from 'react';

import {
  Input
} from 'reactstrap';

import DatePicker from 'react-datepicker';

function CustomInput(props){
  return (
    <Input
      className="form-control-alternative"
      value={props.value}
      onClick={props.onClick}
    />
  );
}

export default function(props) {
  return (
    <DatePicker
      customInput={<CustomInput />}
      dateFormat="dd/MM/yyyy"
      {...props}
    />
  );
}