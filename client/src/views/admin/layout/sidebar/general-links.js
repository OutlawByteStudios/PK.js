import React from 'react';
import { NavLink as NavLinkRRD } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { generalRoutes } from "../../routes";
import Auth from "../../../../utils/auth";

const QUERY = gql`
query GeneralLinks($steamID: String!){
  steamUser(steamID: $steamID){
    _id
    panelAdmin
  }
}
`;

class GeneralLinks extends React.Component {
  createLinks(routes, user) {
    return routes.map((route, key) => {
      if(route.displayInSidebar === false) return null;
      if(route.requiredPermission && !user[route.requiredPermission]) return null;
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
      <Query
        query={QUERY}
        variables={{
          steamID: Auth.claim.steamID
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return (
            <h6 className="navbar-heading text-muted"><i className="fas fa-circle-notch fa-spin" /> Loading</h6>
          );
          if (error) return (
            <h6 className="navbar-heading text-muted"><i className="fas fa-exclamation-triangle" /> Error :(</h6>
          );

          return (
            <Nav navbar>{this.createLinks(generalRoutes, data.steamUser)}</Nav>
          );
        }}
      </Query>
    );
  }
}


export default GeneralLinks;
