import React from 'react';
import moment from 'moment';

import {
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

class Component extends React.Component {
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

    const { player } = this.props;
    return (
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
    );
  }
}

export default Component;