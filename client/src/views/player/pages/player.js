import React from 'react';

import {
  Col
} from 'reactstrap';

import Layout from '../layout/layout';

import { Offences } from '../../../components';

class SelectPlayer extends React.Component {
  render(){
    let serverID = parseInt(this.props.match.params.serverID) || null;
    let guid = this.props.match.params.guid || null;
    return (
      <Layout
        serverID={serverID}
        guid={guid}
      >
        <Col>
          <Offences
            serverID={serverID}
            guid={guid}
          />
        </Col>
      </Layout>
    );
  }
}

export default SelectPlayer;