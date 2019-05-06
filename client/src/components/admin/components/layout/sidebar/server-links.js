import React from 'react';
import { NavLink as NavLinkRRD } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { serverRoutes } from '../../../routes';
import { Query } from 'react-apollo';

import Auth from '../../../../../utils/auth';

import query from './query';

class ServerLinks extends React.Component {
  createLinks = (routes, permissions) => {
    return routes.map((route, key) => {
      if(route.displayInSidebar === false) return null;
      if(route.requiredPermission && !permissions[route.requiredPermission]) return null;
      return (
        <NavItem key={key}>
          <NavLink
            to={route.path.replace(":serverID", this.props.serverID)}
            exact={route.exact}
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
    if(this.props.serverID ===  null) return null;
    return (
      <Query
        query={query}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return (
            <>
              {/* Divider */}
              <hr className="my-3" />
              {/* Heading */}
              <h6 className="navbar-heading text-muted">Server</h6>
            </>
          );
          if (error) return (
            <>
              {/* Divider */}
              <hr className="my-3" />
              {/* Heading */}
              <h6 className="navbar-heading text-muted">Error :(</h6>
            </>
          );

          return (
            <>
              {/* Divider */}
              <hr className="my-3" />
              {/* Heading */}
              <h6 className="navbar-heading text-muted">{data.server.name}</h6>
              {/* Navigation */}
              <Nav navbar>{this.createLinks(serverRoutes, data.server.adminPermission)}</Nav>
            </>
          );
        }}
      </Query>
    );
  }
}


export default ServerLinks;
