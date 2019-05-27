import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Col,
  Container,
  Row,
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import { CreateServer as CreateServerComponent } from '../../../graphql/components';


class CreateServer extends React.Component {

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
          <Row className="mb-4">
            <Col className="order-xl-1">
              <CreateServerComponent />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(CreateServer);
