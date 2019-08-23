import React from 'react';
import {
  Media,
  NavLink
} from 'reactstrap';

export default function(props) {
  return (
    <Media className="align-items-center">
        <span className="avatar avatar-sm rounded-circle">
          <img
            alt="..."
            src={props.steamUser.avatar}
          />
        </span>
      <Media className="ml-2">
          <span className="mb-0 text-sm font-weight-bold">
            {props.steamUser.displayName}
          </span>
      </Media>
    </Media>
  );
}