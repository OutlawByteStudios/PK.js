import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Auth from '../../../utils/auth';

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/cover.png") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="12" md="12">
                <h1 className="display-2 text-white">Hello {Auth.claim.displayName}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
export default UserHeader;