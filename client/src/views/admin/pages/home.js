import React from 'react';

import {
  Container,
  Col,
  Row
} from 'reactstrap';

import Header from '../layout/header';
import Layout from '../layout/layout';

import {
  ServerSelectorMenu
} from '../../../components';

class Home extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        match={this.props.match}
        serverID={null}
      >
        <Header
          serverID={null}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col>
              <ServerSelectorMenu />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Home;
