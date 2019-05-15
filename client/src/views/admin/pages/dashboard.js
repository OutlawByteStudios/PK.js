import React from 'react';

import {
  Container,
  Row
} from 'reactstrap';

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
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>

          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Dashboard;
