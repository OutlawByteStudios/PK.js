import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Row
} from 'reactstrap';

import Header from '../layout/header';
import Layout from '../layout/layout';

import {
  IPSelector,
  PlayersOnIP
} from '../../../components';

class PlayersByIP extends React.Component {
  constructor(){
    super();
    this.onIPMaskIDChange = this.onIPMaskIDChange.bind(this);
  }

  onIPMaskIDChange(ipMaskID){
    this.props.history.push(
      this.props.match.path
        .replace(':serverID', this.props.match.params.serverID)
        .replace('/:ipMask', '')
      + '/' + ipMaskID
    );
  }

  render() {
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let ipMask = parseInt(this.props.match.params.ipMask) || null;

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
            <Col className="order-xl-1">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">IP Search</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Search
                          </label>
                          <IPSelector serverID={serverID} ipMask={ipMask} onChange={this.onIPMaskIDChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {
            ipMask &&
            (
              <Row className="mb-4">
                <Col className="order-xl-1">
                  <PlayersOnIP serverID={serverID} ipMask={ipMask} />
                </Col>
              </Row>
            )
          }
        </Container>
      </Layout>
    );
  }
}

export default withRouter(PlayersByIP);
