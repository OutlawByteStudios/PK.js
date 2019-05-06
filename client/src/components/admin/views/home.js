import React from 'react';

import {
  Container,
  Row
} from 'reactstrap';

import Header from '../components/layout/header';
import Layout from '../components/layout/layout';

class Home extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        match={this.props.match}
        serverID={null}
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

export default Home;
