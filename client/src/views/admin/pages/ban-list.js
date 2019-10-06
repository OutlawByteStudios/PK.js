import React from 'react';

import {
  Col,
  Container,
  Row
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import { BanList } from '../../../components';

class BanListPage extends React.Component {
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
              <BanList serverID={serverID} active={true} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <BanList serverID={serverID} active={false} />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default BanListPage;
