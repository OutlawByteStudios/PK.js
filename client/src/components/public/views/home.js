import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col
} from 'reactstrap';

import Layout from '../components/layout/layout';

class Login extends React.Component {

  render(){
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
                  href="/login"
                >
                  <i className="fas fa-key" />
                  <span className="btn-inner--text">Login</span>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Layout>
    );
  }
}

export default Login;