import React from 'react';

import {
  Col,
  Container,
  Row
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import { RichestPlayers } from '../../../components';

class RichestPlayersPage extends React.Component {
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
              <RichestPlayers serverID={serverID} />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default RichestPlayersPage;
