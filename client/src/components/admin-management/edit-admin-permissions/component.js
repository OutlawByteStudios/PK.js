import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Row
} from 'reactstrap';

import { gamePermissions, panelPermissions } from 'shared/constants';

import SteamUser from '../../misc/steam-user';
import PermissionCheckbox from './permission-checkbox';
import SaveChange from './save-changes';
import PlayerSelector from '../../player-management/player-selector';

class Component extends React.Component{
  constructor(props){
    super();

    this.state = {
      ...props.selectedAdmin,
      guid: (props.selectedAdmin.player) ? props.selectedAdmin.player.guid : ''
    };

    this.updatePermission = this.updatePermission.bind(this);
    this.clearPermissions = this.clearPermissions.bind(this);
  }

  updatePermission(changedPermission, value){
    if(changedPermission === 'manageAssignPermissions' && value > 0){
      for(let permission of panelPermissions.concat(gamePermissions)){
        if(permission.permission === 'manageAssignPermissions') continue;
        this.setState({ [permission.permission]: 2 });
      }
    }
    this.setState({ [changedPermission]: value });
  }

  clearPermissions(){
    const selectedAdmin = this.state;
    const { currentAdmin } = this.props;

    if(selectedAdmin.admin.steamID === currentAdmin.admin.steamID) return;

    for(let permission of panelPermissions.concat(gamePermissions)){
      if (
        (permission === 'manageAssignPermissions' &&
          currentAdmin.manageAssignPermissions < 2) ||
        (permission !== 'manageAssignPermissions' &&
          ((selectedAdmin[permission] < 2 &&
            selectedAdmin[permission] < 2 &&
            currentAdmin.manageAssignPermissions < 1) ||
            (selectedAdmin[permission] > 1 &&
              (selectedAdmin.manageAssignPermissions > 0 ||
                currentAdmin.manageAssignPermissions < 1))))
      )
        continue;

      this.setState({ [permission.permission]: 0 });
    }
  }

  render(){
    const selectedAdmin = this.state;
    const { currentAdmin } = this.props;

    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <SteamUser steamUser={selectedAdmin.admin}/>
            </Col>
            <Col className="col text-right">
              <Button
                color="danger"
                size="sm"
                onClick={this.clearPermissions}
              >
                Remove all Permissions
              </Button>
              <SaveChange
                serverID={this.props.serverID}
                steamID={this.props.steamID}
                adminPermissions={this.state}
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <h6 className="heading-small text-muted mb-4">Panel Permissions</h6>
          <div className="pl-lg-4">
            <Row>
              {
                panelPermissions.map((permission, key) => (
                  <PermissionCheckbox
                    permission={permission.permission}
                    label={permission.label}
                    selectedAdmin={selectedAdmin}
                    currentAdmin={currentAdmin}
                    onChange={this.updatePermission}
                    key={key}
                  />
                ))
              }
            </Row>
          </div>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">In-Game Permissions</h6>
          <div className="pl-lg-4">
            <Row>
              <Col md="6" lg="6" xl="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    Player
                  </label>
                  <PlayerSelector
                    serverID={this.props.serverID}
                    player={this.state.guid}
                    allowNone={true}
                    onChange={guid => this.setState({ guid })}
                  />
                </FormGroup>
              </Col>
              {
                gamePermissions.map((permission, key) => (
                  <PermissionCheckbox
                    permission={permission.permission}
                    label={permission.label}
                    selectedAdmin={selectedAdmin}
                    currentAdmin={currentAdmin}
                    onChange={this.updatePermission}
                    key={key}
                  />
                ))
              }
            </Row>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Component;