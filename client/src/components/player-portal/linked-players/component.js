import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";

import LinkSteamUser from '../link-steam-user';

class Component extends React.Component{
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
            <th>Player Count</th>
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
                  {
                    player.server.serverStatus &&
                    (
                      <>{player.server.serverStatus.NumberOfActivePlayers} / {player.server.serverStatus.MaxNumberOfPlayers}</>
                    )
                  }
                  {
                    !player.server.serverStatus &&
                    (
                      <>Server Offline</>
                    )
                  }
                </td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={`/player/${player.server.id}/${player.guid}/`}
                  >
                    Go to Server...
                  </Button>
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