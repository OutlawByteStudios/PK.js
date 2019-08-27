import React from 'react';

import {
  Col, Row
} from 'reactstrap';

import Layout from '../layout/layout';

import {
  ServerStatus,
  ServerStatsGraph,
  OnlinePlayers
} from '../../../components';

class ServerInfo extends React.Component {
  render(){
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let guid = this.props.match.params.guid || null;
    return (
      <Layout
        serverID={serverID}
        guid={guid}
      >
        <Row className="justify-content-center">
          <Col>
            <ServerStatus serverID={serverID} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col>
            <ServerStatsGraph serverID={serverID} stat="playerCount" />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col>
            <OnlinePlayers
              serverID={serverID}
              playerPortal={true}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default ServerInfo;