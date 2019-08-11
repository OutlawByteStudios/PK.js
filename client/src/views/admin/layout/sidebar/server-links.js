import React from 'react';
import { NavLink as NavLinkRRD } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


import Auth from '../../../../utils/auth';

import { serverRoutes } from '../../routes';

import Fragments from '../../../../graphql/fragments';

const QUERY = gql`
  query ServerLinks($serverID: Int!, $steamID: String!){
    server(id: $serverID){
      _id
      name
      adminPermission(steamID: $steamID){
        ...AdminPermission
      }
    }
  }
  ${Fragments.AdminPermission}
`;

class ServerLinks extends React.Component {
  createLinks(routes, permissions) {
    return routes.map((route, key) => {
      if(route.displayInSidebar === false) return null;

      let hasPermission = true;
      if(route.requiresPermission && route.requiresPermission.length > 0){
        hasPermission = false;
        for(let permission of route.requiresPermission){
          if(permissions[permission] <= 0) continue;
          hasPermission = true;
          break;
        }
      }

      if(!hasPermission) return null;
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
        query={QUERY}
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
