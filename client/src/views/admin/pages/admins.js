import React from 'react';

import {
  Col,
  Container,
  Row,
} from 'reactstrap';

import Header from '../layout/header';
import Layout from '../layout/layout';

import {
  AdminList,
  EditAdminPermissions
} from '../../../components';

class Admins extends React.Component {
  render() {
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let steamID = this.props.match.params.steamID || null;
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
          {/* Table */}
          <Row>
            <Col>
              <AdminList serverID={serverID} currentSelectedSteamID={steamID} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              {
                steamID &&
                <EditAdminPermissions serverID={serverID} steamID={steamID} />
              }
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Admins;
