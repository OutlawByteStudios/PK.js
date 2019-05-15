import React from 'react';
import { NavLink as NavLinkRRD } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { generalRoutes } from '../../routes';

class GeneralLinks extends React.Component {
  createLinks(routes) {
    return routes.map((route, key) => {
      if(route.displayInSidebar === false) return null;
      return (
        <NavItem key={key}>
          <NavLink
            to={route.path}
            exact
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={route.icon} />
            {route.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  render(){
    return (
      <Nav navbar>{this.createLinks(generalRoutes)}</Nav>
    );
  }
}


export default GeneralLinks;
