import React from 'react';

import {
  Card,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

class Component extends React.Component {
  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Richest Players</h3>
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Name</th>
            <th scope="col">Gold in Bank</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.richestPlayers.map((player, key) => (
              <tr key={key}>
                <th>{key+1}</th>
                <td>{player.lastPlayerName}</td>
                <td>{player.bankGold}</td>
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