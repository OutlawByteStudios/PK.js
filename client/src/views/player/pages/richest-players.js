import React from 'react';

import {
  Col, Row
} from 'reactstrap';

import Layout from '../layout/layout';

import {
  RichestPlayers
} from '../../../components';

class RichestPlayersPage extends React.Component {
  render(){
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let guid = this.props.match.params.guid || null;
    return (
      <Layout
        serverID={serverID}
        guid={guid}
      >
        <Row className="justify-content-center mt-4">
          <Col>
            <RichestPlayers
              serverID={serverID}
              playerPortal={true}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default RichestPlayersPage;