import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';

import ConfigSelector from '../configs/config-selector';
import ModuleSelector from '../module-selector';

import StartServer from './start-server';
import RestartServer from './restart-server';
import StopServer from './stop-server';

class Component extends React.Component{
  constructor(props){
    super();

    this.state = {
      module: props.lastModule,
      config: props.lastConfig
    };
  }

  render(){
    return (
      <Card>
        <CardHeader>
          <h3 className="mb-0">Server Controller</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col
              md="12"
              lg="4"
              className="mb-2"
            >
              <ModuleSelector
                serverID={this.props.serverID}
                selectedModule={this.state.module}
                disabled={this.props.online}
                onChange={(module => this.setState({ module }))}
              />
            </Col>
            <Col
              md="12"
              lg="4"
              className="mb-2"
            >
              <ConfigSelector
                serverID={this.props.serverID}
                selectedConfig={this.state.config}
                disabled={this.props.online}
                onChange={(config => this.setState({ config }))}
              />
            </Col>
            <Col
              md="12"
              lg="4"
              className="text-center mb-2"
            >
              {
                this.props.online === false &&
                (
                  <StartServer
                    serverID={this.props.serverID}
                    module={this.state.module}
                    config={this.state.config}
                  />
                )
              }
              {
                this.props.online &&
                (
                  <>
                    <RestartServer
                      serverID={this.props.serverID}
                    />
                    <StopServer
                      serverID={this.props.serverID}
                    />
                  </>
                )
              }
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Component;