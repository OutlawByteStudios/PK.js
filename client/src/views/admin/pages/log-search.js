import React from 'react';

import {
  Col,
  Container,
  Row
} from 'reactstrap';

import Header from '../layout/header';
import Layout from '../layout/layout';

import { LogSearch, LogResults } from '../../../components';

class LogSearchPage extends React.Component {

  render() {
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let searchString = this.props.match.params.searchString || null;

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
          <Row className="mb-4">
            <Col>
              <LogSearch searchString={searchString} />
            </Col>
          </Row>
          {
            searchString !== null &&
            (
              <LogResults
                serverID={serverID}
                searchString={searchString}
              />
            )
          }
        </Container>
      </Layout>
    );
  }
}

export default LogSearchPage;
