import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Col,
  Container,
  Row,
} from "reactstrap";

import Header from '../layout/header';
import Layout from '../layout/layout';

import PlayerSelector from '../../../components/player-selector';
import Offences from '../../../components/player-info/offences';
import Player from '../../../components/player-info/player';
import Names from '../../../components/player-info/names';

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
        serverID={parseInt(serverID)}
      >
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mb-4">
            <Col className="order-xl-1">
              <PlayerSelector serverID={serverID} defaultGuid={guid} onChange={this.onPlayerChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Offences serverID={serverID} guid={guid} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Player serverID={serverID} guid={guid} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="order-xl-1">
              <Names serverID={serverID} guid={guid} />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(Players);
