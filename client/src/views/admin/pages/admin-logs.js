import React from 'react';

import {
  Container,
} from 'reactstrap';

import Header from '../layout/header';
import Layout from '../layout/layout';

import { AdminLogs as AdminLogsComponent } from '../../../components';

class AdminLogs extends React.Component {
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
          <AdminLogsComponent serverID={serverID} />
        </Container>
      </Layout>
    );
  }
}

export default AdminLogs;
