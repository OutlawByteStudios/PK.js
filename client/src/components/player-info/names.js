import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

const QUERY = gql`
  query PlayerInfo($serverID: Int!, $guid: String!){
    server(id: $serverID){ 
      player(guid: $guid){        
        playerNames {
          name
        }
      }
    }
  }
`;

class Names extends React.Component {
  render() {
    if(this.props.guid === null) return null;
    return (
      <Query
        query={QUERY}
        variables={{
          serverID: parseInt(this.props.serverID),
          guid: this.props.guid
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return (
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Player Names</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  Loading...
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

          if (error) return (
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Player Names</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  Something went wrong!
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

          const player = data.server.player;
          return (
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Player Names</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {
                  player.playerNames.map((name, key) => (
                    <Badge color="primary" key={key}>{name.name}</Badge>
                  ))
                }
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Names;