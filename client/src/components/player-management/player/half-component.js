import React from 'react';
import moment from 'moment';

import {
  Card,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import AdjustGold from './adjust-gold';
import StripPlayer from './strip-player';

class FullComponent extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col className="col">
              <h3 className="mb-0">Player Info</h3>
            </Col>
            <Col className="col text-right">
              <StripPlayer
                serverID={this.props.serverID}
                guid={player.guid}
              />
              <AdjustGold
                serverID={this.props.serverID}
                guid={player.guid}
              />
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>GUID</th>
            <th>Online</th>
            <th>Last Seen</th>
            <th>Last Player Name</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>{player.guid}</th>
            <td>{(player.online > 0) ? 'Online' : 'Offline'}</td>
            <td>{moment.utc(player.lastSeen).format('DD/MM/YYYY HH:mm')}</td>
            <td>{player.lastPlayerName}</td>
          </tr>
          </tbody>
          <thead className="thead-light">
          <tr>
            <th>Pouch</th>
            <th>Bank</th>
            <th>Bank Limit</th>
            <th>{null}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{player.pouchGold}</td>
            <td>{player.bankGold}</td>
            <td>{player.bankLimit}</td>
            <td>{null}</td>
          </tr>
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default FullComponent;