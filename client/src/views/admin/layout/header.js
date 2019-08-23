import React from 'react';

import {
  Col,
  Container,
  Row
} from 'reactstrap';

import {
  ServerStatus,
} from '../../../components';

class Header extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            backgroundImage:
              "url(" + require("assets/img/theme/cover.png") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center 25%"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-7" />

          {
            this.props.serverID &&
            (
              <Container fluid>
                <div className="header-body">
                  {/* Card stats */}
                  <Row className="mt-5 mt-lg-0">
                    <Col md="12" lg="6">
                      <ServerStatus
                        serverID={this.props.serverID}
                      />
                    </Col>
                  </Row>
                </div>
              </Container>
            )
          }
        </div>
      </>
    );
  }
}

export default Header;
