import React from 'react';
import { Redirect } from 'react-router-dom';

import {
  Button,
  Card,
  CardHeader,
  Col
} from 'reactstrap';

import Layout from '../layout/layout';

import Auth from '../../../utils/auth';

class Home extends React.Component {

  render(){
    if(!Auth.isLoggedIn) return <Redirect to="/login" />;
    return (
      <Layout>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Where to?</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="/player"
                >
                  <i className="fas fa-user" />
                  <span className="btn-inner--text">Player Portal</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="/admin"
                >
                  <i className="fas fa-user-shield" />
                  <span className="btn-inner--text">Admin Panel</span>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Layout>
    );
  }
}

export default Home;