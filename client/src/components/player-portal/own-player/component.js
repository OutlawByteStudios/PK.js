import React from 'react';
import moment from 'moment';

import {
  Card,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import SteamUser from '../../misc/steam-user';

class Component extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col className="col">
              <h3 className="mb-0">Player Info</h3>
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>GUID</th>
            <th>Online</th>
            <th>Last Player Name</th>
            <th>Linked Steam User</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>{player.guid}</th>
            <td>{moment.utc(player.lastSeen).format('DD/MM/YYYY HH:mm')} ({(player.online > 0) ? 'Online' : 'Offline'})</td>
            <td>{player.lastPlayerName}</td>
            <td>{(player.linkedSteamUser) ? <SteamUser steamUser={player.linkedSteamUser} /> : 'No linked Steam User'}</td>
          </tr>
          </tbody>
          <thead className="thead-light">
          <tr>
            <th>Pouch</th>
            <th>Bank</th>
            <th>Bank Limit</th>
            <th>Horse</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{player.pouchGold}</td>
            <td>{player.bankGold}</td>
            <td>{player.bankLimit}</td>
            <td>{(player.horse === null) ? 'Empty' : player.horse.name}</td>
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
            <th>Health</th>
            <th>Food</th>
            <th>Poison</th>
            <th>Horse Health</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{player.health}</td>
            <td>{player.food}</td>
            <td>{player.poison}</td>
            <td>{player.horseHealth}</td>
          </tr>
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default Component;