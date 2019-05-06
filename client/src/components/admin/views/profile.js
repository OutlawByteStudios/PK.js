import React from 'react';

import Auth from '../../../utils/auth';
import {
  Container,
  Row
} from 'reactstrap';

import Header from '../components/layout/header';
import OwnProfileHeader from '../components/layout/profile-header';
import Layout from '../components/layout/layout';

class Profile extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        match={this.props.match}
        serverID={null}
      >
        {(this.props.match.params.steamID === Auth.claim.steamID) ? <OwnProfileHeader /> : <Header />}
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>

          </Row>
        </Container>
      </Layout>
    );
  }
}
export default Profile;