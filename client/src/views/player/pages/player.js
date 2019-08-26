import React from 'react';

import {
  Col,
  Row
} from 'reactstrap';

import Layout from '../layout/layout';

import {
  OwnPlayer,
  OwnPlayerNames,
  Offences
} from '../../../components';

class Player extends React.Component {
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
            <OwnPlayer
              serverID={serverID}
              guid={guid}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col>
            <OwnPlayerNames
              serverID={serverID}
              guid={guid}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col>
            <Offences
              serverID={serverID}
              guid={guid}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Player;