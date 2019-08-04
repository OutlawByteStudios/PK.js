import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import SteamUser from '../../misc/steam-user';
import RemoveAdmin from '../remove-admin';
import AddAdmin from '../add-admin';


class Component extends React.Component{
  constructor(){
    super();
    this.editAdminRedirect = this.editAdminRedirect.bind(this);
  }

  editAdminRedirect(steamID){
    this.props.history.push(
      this.props.match.path
        .replace(':serverID', this.props.serverID)
        .replace('/:steamID', '')
      + ((steamID) ? '/' + steamID : '')
    );
  }

  render(){
    return (
      <Card>
        <CardHeader className="border-0">
          <h3 className="mb-0">Admins</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>Admin</th>
            <th>GUID</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.adminPermissions.map((adminPermission, key) => (
              <tr key={key}>
                <td>
                  <SteamUser steamUser={adminPermission.admin} />
                </td>
                <td>{(adminPermission.player) ? adminPermission.player.guid : 'GUID not set.'}</td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    className={(this.props.currentSelectedSteamID === adminPermission.admin.steamID) ? 'disabled' : null}
                    onClick={() => { this.editAdminRedirect(adminPermission.admin.steamID); }}
                  >
                    Edit Permission
                  </Button>
                  <RemoveAdmin serverID={this.props.serverID} steamID={adminPermission.admin.steamID} />
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
        <CardBody className="text-center">
          <Row className="justify-content-center">
            <Col lg="6">
              <AddAdmin serverID={this.props.serverID} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(Component);