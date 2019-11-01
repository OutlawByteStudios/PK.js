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
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col className="col">
              <h3 className="mb-0">Ban List ({this.props.active ? 'Active' : 'All'} Bans)</h3>
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th scope="col">GUID</th>
            <th scope="col">Reason</th>
            <th scope="col">Public Reason</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">IP Ban?</th>
            <th scope="col">Admin</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.bans.map((ban, key) => (
              <tr key={key}>
                <th scope="row">{ban.player.guid}</th>
                <td>{ban.privateReason}</td>
                <td>{ban.publicReason}</td>
                <td>{moment.utc(ban.startDate).format('DD/MM/YYYY HH:mm')}</td>
                <td>
                  {(ban.endDate ===  null) ? 'Perm Ban' : moment.utc(ban.endDate).format('DD/MM/YYYY HH:mm')}
                  <br />
                  {(ban.unbannedDate !==  null) ? `(Unbanned at: ${moment.utc(ban.unbannedDate).format('DD/MM/YYYY HH:mm')})` : ''}
                </td>
                <td>
                  {(ban.ipBan) ? 'Yes' : 'No'}
                </td>
                <td>
                  <SteamUser steamUser={ban.admin} />
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default Component;