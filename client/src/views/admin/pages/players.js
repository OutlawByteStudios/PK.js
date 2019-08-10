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
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import {
  Player,
  PlayerIPs,
  PlayerOffences,
  PlayerNames,
  PlayerSelector,
  PlayerStatsGraph
} from '../../../components';

class Players extends React.Component {
  constructor(){
    super();
    this.onPlayerChange = this.onPlayerChange.bind(this);
  }

  onPlayerChange(guid){
    this.props.history.push(
      this.props.match.path
        .replace(':serverID', this.props.match.params.serverID)
        .replace('/:guid', '')
        + '/' + guid
    );
  }

  render() {
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let guid = this.props.match.params.guid || null;

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
                      <h3 className="mb-0">Player Search</h3>
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
                          <PlayerSelector serverID={serverID} player={guid} onChange={this.onPlayerChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {
            guid &&
            (
              <>
                <Row>
                  <Col>
                    <PlayerOffences serverID={serverID} guid={guid} />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <Player serverID={serverID} guid={guid} />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col className="order-xl-1">
                    <PlayerNames serverID={serverID} guid={guid} />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col className="order-xl-1">
                    <PlayerIPs serverID={serverID} guid={guid} />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col className="order-xl-1">
                    <PlayerStatsGraph serverID={serverID} guid={guid} stat="totalGold" />
                  </Col>
                </Row>
              </>
            )
          }
        </Container>
      </Layout>
    );
  }
}

export default withRouter(Players);
