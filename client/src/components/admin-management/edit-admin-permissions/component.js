import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Row
} from 'reactstrap';

import {
  assignPermissionCheck,
  gamePermissions,
  panelPermissions,
  permissionPresets
} from 'shared/constants';

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
    this.applyPreset = this.applyPreset.bind(this);
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

    // handle manageAssignPermissions first
    if(
      // do they have permission to do the remove?
      assignPermissionCheck(currentAdmin, selectedAdmin, 'manageAssignPermissions')
    // apply change
    ) selectedAdmin.manageAssignPermissions = 0;

    for (let permission of panelPermissions.concat(gamePermissions)) {
      // we handled this permission already, so skip
      if(permission.permission === 'manageAssignPermissions') continue;

      if(
        // do they have permission to do the change?
        assignPermissionCheck(currentAdmin, selectedAdmin, permission.permission)
      // apply change
      ) selectedAdmin[permission.permission] = 0;
    }

    this.setState(selectedAdmin);
  }

  applyPreset(preset){
    if(preset === null) return;

    const selectedAdmin = this.state;
    const { currentAdmin } = this.props;

    // handle manageAssignPermissions first
    if(
      // do they have permission to do the remove?
      assignPermissionCheck(currentAdmin, selectedAdmin, 'manageAssignPermissions', permissionPresets[preset].manageAssignPermissions > 1)
    // apply change
    ) selectedAdmin.manageAssignPermissions = permissionPresets[preset].manageAssignPermissions;

    for (let permission of panelPermissions.concat(gamePermissions)) {
      // we handled this permission already, so skip
      if(permission.permission === 'manageAssignPermissions') continue;

      if(
        // do they have permission to do the change?
        assignPermissionCheck(currentAdmin, selectedAdmin, permission.permission, permissionPresets[preset].manageAssignPermissions > 1)
      // apply change
      ) selectedAdmin[permission.permission] = permissionPresets[preset][permission.permission];
    }

    // if the manageAssignPermission was set to more than none, then apply
    // assign permissions for all other permissions
    if (selectedAdmin.manageAssignPermissions > 0)
      for (let permission of panelPermissions.concat(gamePermissions)) {
        if (permission.permission === 'manageAssignPermissions') continue;
        selectedAdmin[permission.permission] = 2;
      }

    this.setState(selectedAdmin);
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
          <h6 className="heading-small text-muted mb-4">Presets</h6>
          <div className="pl-lg-4">
            <Row>
              <Col>
                <Input
                  type="select"
                  bsSize="sm"
                  onChange={event => this.applyPreset(event.target.value)}
                  disabled={selectedAdmin.admin.steamID === currentAdmin.admin.steamID}
                >
                  <option value={null}>Select a preset to apply...</option>
                  {
                    Object.keys(permissionPresets).map((preset, key) => (
                      <option
                        value={preset}
                        key={key}
                      >{preset}</option>
                    ))
                  }
                </Input>
              </Col>
            </Row>
          </div>
          <hr className="my-4" />
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
                    isDisabled={currentAdmin.manageAdminGUIDs === 0}
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