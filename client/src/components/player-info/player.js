import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  Button,
  Card, CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";

const QUERY = gql`
  query PlayerInfo($serverID: Int!, $guid: String!){
    server(id: $serverID){ 
      player(guid: $guid){
        guid
        pouchGold
        bankGold
        bankLimit
        headArmour {
          name
        }
        bodyArmour {
          name
        }
        footArmour {
          name
        }
        handArmour {
          name
        }
        firstItem {
          name
        }
        secondItem {
          name
        }
        thirdItem {
          name
        }
        forthItem {
          name
        }
        horse {
          name
        }
        health
        food
        poison       
      }
    }
  }
`;

class Player extends React.Component {
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
                    <h3 className="mb-0">Player Info</h3>
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
                    <h3 className="mb-0">Player Info</h3>
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
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col className="col">
                    <h3 className="mb-0">Player Info</h3>
                  </Col>
                  <Col className="col text-right">
                    <Button
                      color="primary"
                      size="sm"
                    >
                      Strip Gear
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                    >
                      Adjust Gold
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                  <th>GUID</th>
                  <th>Pouch</th>
                  <th>Bank</th>
                  <th>Bank Limit</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th>{player.guid}</th>
                  <td>{player.pouchGold}</td>
                  <td>{player.bankGold}</td>
                  <td>{player.bankLimit}</td>
                </tr>
                </tbody>
                <thead className="thead-light">
                <tr>
                  <th>Head Armour</th>
                  <th>Body Armour</th>
                  <th>Foot Armour</th>
                  <th>Hand Armour</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{(player.headArmour === null) ? 'Empty' : player.headArmour.name}</td>
                  <td>{(player.bodyArmour === null) ? 'Empty' : player.bodyArmour.name}</td>
                  <td>{(player.footArmour === null) ? 'Empty' : player.footArmour.name}</td>
                  <td>{(player.handArmour === null) ? 'Empty' : player.handArmour.name}</td>
                </tr>
                </tbody>
                <thead className="thead-light">
                <tr>
                  <th>First Item</th>
                  <th>Second Item</th>
                  <th>Third Item</th>
                  <th>Fourth Item</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{(player.firstItem === null) ? 'Empty' : player.firstItem.name}</td>
                  <td>{(player.secondItem === null) ? 'Empty' : player.secondItem.name}</td>
                  <td>{(player.thirdItem === null) ? 'Empty' : player.thirdItem.name}</td>
                  <td>{(player.forthItem === null) ? 'Empty' : player.forthItem.name}</td>
                </tr>
                </tbody>
                <thead className="thead-light">
                <tr>
                  <th>Horse</th>
                  <th>Health</th>
                  <th>Food</th>
                  <th>Poison</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{(player.horse === null) ? 'Empty' : player.horse.name}</td>
                  <td>{player.health}</td>
                  <td>{player.food}</td>
                  <td>{player.poison}</td>
                </tr>
                </tbody>
              </Table>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Player;