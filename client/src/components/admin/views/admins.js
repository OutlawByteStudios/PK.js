import React from 'react';

import {
  Col,
  Container,
  Row,
} from 'reactstrap';

import Header from '../components/layout/header';
import Layout from '../components/layout/layout';

import AdminList from '../components/admin-list';
import AdminPermission from '../components/admin-permission';

class Admins extends React.Component {
  render() {
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let steamID = this.props.match.params.steamID || null;
    return (
      <Layout
        location={this.props.location}
        match={this.props.match}
        serverID={parseInt(serverID)}
      >
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <Col>
              <AdminList serverID={serverID} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <AdminPermission serverID={serverID} steamID={steamID} />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Admins;
