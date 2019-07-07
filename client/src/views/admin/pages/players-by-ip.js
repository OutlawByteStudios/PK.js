import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Col,
  Container,
  Row,
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import {
  Player,
  PlayerIPs,
  PlayerOffences,
  PlayerNames,
  PlayerSelector
} from '../../../components';

class Players extends React.Component {
  render() {
    let serverID = parseInt(this.props.match.params.serverID) || null;
    return (
      <Layout
        location={this.props.location}
        match={this.props.match}
        serverID={serverID}
      >
        <Header
          serverID={serverID}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mb-4">
            <Col className="order-xl-1">

            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(Players);
