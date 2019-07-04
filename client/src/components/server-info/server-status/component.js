import React from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';

class Component extends React.Component{
  render(){
    if(!this.props.serverStatus) return (
      <Card className="card-stats mb-4 mb-lg-0">
        <CardBody>
          <Row>
            <Col>
              <CardTitle className="text-uppercase text-muted mb-0">
                Unknown Server
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">
                Offline
              </span>
            </Col>
            <Col className="col-auto">
              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                <i className="fas fa-exclamation" />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );

    return (
      <Card className="card-stats mb-4 mb-lg-0">
        <CardBody>
          <Row>
            <Col>
              <CardTitle className="text-uppercase text-muted mb-0">
                {this.props.serverStatus.Name}
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">
                {this.props.serverStatus.NumberOfActivePlayers} / {this.props.serverStatus.MaxNumberOfPlayers}
              </span>
            </Col>
            <Col className="col-auto">
              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                {
                  this.props.serverStatus.HasPassword && (
                    <i className="fas fa-lock" />
                  )
                }
                {
                  !this.props.serverStatus.HasPassword && (
                    <i className="fas fa-server" />
                  )
                }
              </div>
            </Col>
          </Row>
          <p className="mt-3 mb-0 text-muted text-sm">
            <span className="text-nowrap">{this.props.serverStatus.MapName}</span>
          </p>
        </CardBody>
      </Card>
    );
  }
}

export default Component;