import React from 'react';

import {
  Col,
  Container,
  Row
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import { ServerStatsGraph, OnlinePlayers } from '../../../components';

class Dashboard extends React.Component {
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
          <Row>
            <Col>
              <ServerStatsGraph serverID={serverID} stat="playerCount" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <OnlinePlayers serverID={serverID} />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Dashboard;
