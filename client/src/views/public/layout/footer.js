import React from 'react';
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row
} from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2019{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://github.com/SmartPhoenix"
                    target="_blank"
                  >
                    MB-Kingdoms Team
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://github.com/SmartPhoenix/Persistent-Kingdoms"
                      target="_blank"
                    >
                      <i className="fab fa-github"/>{" "}
                      Persistent Kingdoms GitHub
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/SmartPhoenix/PK.js"
                      target="_blank"
                    >
                      <i className="fab fa-github"/>{" "}
                      PK.js GitHub
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}
export default Footer;