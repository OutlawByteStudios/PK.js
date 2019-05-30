import React from 'react';

import {
  Card, CardBody, CardHeader, Col,
  Container,
  Row
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import {
  DeleteServer
} from '../../../graphql/components';

class ServerManagement extends React.Component {
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
          <Row>
            <Col>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">
                        <i className="fas fa-exclamation-triangle mr-2"/>
                        Danger Zone
                      </h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <DeleteServer serverID={serverID}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default ServerManagement;
