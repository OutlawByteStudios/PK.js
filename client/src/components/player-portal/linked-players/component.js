import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import LinkSteamUser from '../link-steam-user';

class Component extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <Card>
        <CardHeader className="border-0">
          <h3 className="mb-0">Linked Players</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>GUID</th>
            <th>Server Name</th>
            <th>Go To Server</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.linkedPlayers.map((player, key) => (
              <tr key={key}>
                <td>
                  {player.guid}
                </td>
                <td>
                  {player.server.name}
                </td>
                <td>
                  PLACEHOLDER
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
        <CardBody className="text-center">
          <Row className="justify-content-center">
            <Col sm="6" md="4">
              <LinkSteamUser />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Component;