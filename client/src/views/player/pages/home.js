import React from 'react';

import {
  Col, Row
} from "reactstrap";

import Layout from '../layout/layout';

import { LinkedPlayers } from '../../../components';

class SelectPlayer extends React.Component {

  render(){
    return (
      <Layout>
        <Row className="justify-content-center">
          <Col>
            <LinkedPlayers />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default SelectPlayer;