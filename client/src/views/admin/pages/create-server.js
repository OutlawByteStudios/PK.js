import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Col,
  Container,
  Row,
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import { CreateServer } from '../../../components';


class CreateServerPage extends React.Component {

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
          <Row className="mb-4">
            <Col className="order-xl-1">
              <CreateServer />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(CreateServerPage);
