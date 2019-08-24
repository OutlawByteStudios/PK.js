import React from 'react';

import {
  Col
} from 'reactstrap';

import Layout from '../layout/layout';

import { LinkedPlayers } from '../../../components';

class Home extends React.Component {

  render(){
    return (
      <Layout>
        <Col>
          <LinkedPlayers />
        </Col>
      </Layout>
    );
  }
}

export default Home;