import React from 'react';

import {
  Container,
  Col,
  Row
} from 'reactstrap';

import {
  ServerStatsGraph
} from '../../../components';

import Header from '../layout/header';
import Layout from '../layout/layout';

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
              <ServerStatsGraph serverID={serverID} stat="uniqueGUIDs" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="uniqueIPs" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="adminCount" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="totalBans" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="totalWarnings" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="totalNotes" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="playerCount" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="totalGold" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="totalBankGold" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="totalPouchGold" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ServerStatsGraph serverID={serverID} stat="bankLimit" />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Dashboard;
