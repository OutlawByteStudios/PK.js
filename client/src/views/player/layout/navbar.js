import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import routes from '../routes';
import Auth from "../../../utils/auth";

class CustomNavbar extends React.Component {

  createLinks(routes){
    return routes.map((route, key) => {
      if(
        route.displayWhenPlayerSelected &&
        (
          !this.props.match.params.serverID ||
          !this.props.match.params.guid
        )
      ) return null;

      return (
        <NavItem key={key}>
          <NavLink
            className="nav-link-icon"
            to={
              route.path
                .replace(':serverID', this.props.serverID)
                .replace(':guid', this.props.guid)
            }
            tag={Link}
          >
            <i className={route.icon} />
            <span className="nav-link-inner--text">{route.name}</span>
          </NavLink>
        </NavItem>
      );
    });
  }

  render(){
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <NavbarBrand
              to="/"
              tag={Link}
            >
              <img alt="..." src={require("assets/img/brand/pk-js-white.png")} />
            </NavbarBrand>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/pk-js.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                {this.createLinks(routes)}
              </Nav>
            </UncontrolledCollapse>
            <Nav className="align-items-center">
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={Auth.claim.avatar}
                    />
                  </span>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="#pablo" onClick={() => {
                    Auth.logout();
                  }}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default withRouter(CustomNavbar);