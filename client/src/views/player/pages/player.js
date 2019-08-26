import React from 'react';

import {
  Col,
  Row
} from 'reactstrap';

import Layout from '../layout/layout';

import { Offences } from '../../../components';

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