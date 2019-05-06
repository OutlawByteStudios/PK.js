import React from 'react';
import { Query } from 'react-apollo';

import moment from 'moment';

import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Media,
  NavLink,
  Row,
  Table
} from 'reactstrap';

import query from './query';

class PlayerInfo extends React.Component {
  state = {
    tab: 'Bans'
  };

  constructor(){
    super();
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(tab){
    this.setState({ tab });
  }

  render() {
    if(this.props.guid === null) return null;
    return (
      <Query
        query={query}
        variables={{
          serverID: parseInt(this.props.serverID),
          guid: this.props.guid
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return (
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <div className="text-center mt-2 mb-3">
                  Loading...
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </Col>
            </Row>
          );

          if (error) return (
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <Alert color="danger">
                  <i className="fas fa-exclamation-triangle" />{" "}
                  <strong>Error</strong> - Something went wrong.
                </Alert>
              </Col>
            </Row>
          );

          const player = data.server.player;
          return (
            <>
              <Row>
                <Col>
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <Col className="col">
                          <h3 className="mb-0">Offences</h3>
                        </Col>
                        <Col className="col text-right">
                          <Button
                            color="primary"
                            className={(this.state.tab === 'Bans') ? 'disabled' : null}
                            onClick={() => this.onTabChange('Bans')}
                            size="sm"
                          >
                            Bans
                          </Button>
                          <Button
                            color="primary"
                            className={(this.state.tab === 'Warnings') ? 'disabled' : null}
                            onClick={() => this.onTabChange('Warnings')}
                            size="sm"
                          >
                            Warnings
                          </Button>
                          <Button
                            color="primary"
                            className={(this.state.tab === 'Notes') ? 'disabled' : null}
                            onClick={() => this.onTabChange('Notes')}
                            size="sm"
                          >
                            Notes
                          </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                    {(this.state.tab === 'Bans') ? (
                      <>
                        <Table className="align-items-center table-flush" responsive>
                          <thead className="thead-light">
                          <tr>
                            <th scope="col">Reason</th>
                            <th scope="col">Public Reason</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Admin</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            player.bans.map((ban, key) => (
                              <tr key={key}>
                                <th scope="row">{ban.privateReason}</th>
                                <td>{ban.publicReason}</td>
                                <td>{moment(ban.startDate).format('DD/MM/YYYY hh:mm')}</td>
                                <td>{moment(ban.endDate).format('DD/MM/YYYY hh:mm')}</td>
                                <td>
                                  <NavLink
                                    href={"/admin/profile/" + ban.admin.steamID}
                                    target="_blank"
                                  >
                                    <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                      <img
                                        alt="..."
                                        src={ban.admin.avatar}
                                      />
                                    </span>
                                      <Media className="ml-2">
                                      <span className="mb-0 text-sm font-weight-bold">
                                        {ban.admin.displayName}
                                      </span>
                                      </Media>
                                    </Media>
                                  </NavLink>
                                </td>
                              </tr>
                            ))
                          }
                          </tbody>
                        </Table>
                        <CardBody className="text-center">
                          <Button
                            color="primary"
                          >
                            Add Ban
                          </Button>
                        </CardBody>
                      </>
                    ) : null}
                    {(this.state.tab === 'Warnings') ? (
                      <>
                        <Table className="align-items-center table-flush" responsive>
                          <thead className="thead-light">
                          <tr>
                            <th scope="col">Reason</th>
                            <th scope="col">Public Reason</th>
                            <th scope="col">Date</th>
                            <th scope="col">Admin</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            player.warnings.map((warning, key) => (
                              <tr key={key}>
                                <th scope="row">{warning.privateReason}</th>
                                <td>{warning.publicReason}</td>
                                <td>{moment(warning.date).format('DD/MM/YYYY hh:mm')}</td>
                                <td>
                                  <NavLink
                                    href={"/admin/profile/" + warning.admin.steamID}
                                    target="_blank"
                                  >
                                    <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                      <img
                                        alt="..."
                                        src={warning.admin.avatar}
                                      />
                                    </span>
                                      <Media className="ml-2 d-none d-lg-block">
                                      <span className="mb-0 text-sm font-weight-bold">
                                        {warning.admin.displayName}
                                      </span>
                                      </Media>
                                    </Media>
                                  </NavLink>
                                </td>
                              </tr>
                            ))
                          }
                          </tbody>
                        </Table>
                        <CardBody className="text-center">
                          <Button
                            color="primary"
                          >
                            Add Warning
                          </Button>
                        </CardBody>
                      </>
                    ) : null}
                    {(this.state.tab === 'Notes') ? (
                      <>
                        <Table className="align-items-center table-flush" responsive>
                          <thead className="thead-light">
                          <tr>
                            <th scope="col">Note</th>
                            <th scope="col">Date</th>
                            <th scope="col">Admin</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            player.notes.map((note, key) => (
                              <tr key={key}>
                                <th scope="row">{note.note}</th>
                                <td>{moment(note.date).format('DD/MM/YYYY hh:mm')}</td>
                                <td>
                                  <NavLink
                                    href={"/admin/profile/" + note.admin.steamID}
                                    target="_blank"
                                  >
                                    <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                      <img
                                        alt="..."
                                        src={note.admin.avatar}
                                      />
                                    </span>
                                      <Media className="ml-2 d-none d-lg-block">
                                      <span className="mb-0 text-sm font-weight-bold">
                                        {note.admin.displayName}
                                      </span>
                                      </Media>
                                    </Media>
                                  </NavLink>
                                </td>
                              </tr>
                            ))
                          }
                          </tbody>
                        </Table>
                        <CardBody className="text-center">
                          <Button
                            color="primary"
                          >
                            Add Note
                          </Button>
                        </CardBody>
                      </>
                    ) : null}
                  </Card>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
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
                </Col>
              </Row>
              <Row className="mt-4">
                <Col className="order-xl-1">
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
                </Col>
              </Row>
            </>
          );
        }}
      </Query>
    );
  }
}

export default PlayerInfo;