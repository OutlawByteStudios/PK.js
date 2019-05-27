import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row
} from 'reactstrap';

import { gamePermissions, panelPermissions } from 'shared';

import { AdminPermissionCheckbox, ErrorModal, SteamUser } from '../index';

class EditAdminPermissions extends React.Component{
  constructor(props){
    super();

    this.state = props.selectedAdmin;

    this.guid = React.createRef();

    this.updatePermission = this.updatePermission.bind(this);
    this.clearPermissions = this.clearPermissions.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
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

  saveChanges(){
    this.props.updatePermissionFunction({
      serverID: this.props.serverID,
      steamID: this.props.steamID,
      guid: this.guid.current.value,
      ...this.state
    })
  }

  render(){
    const selectedAdmin = this.state;
    const { currentAdmin } = this.props;

    return (
      <>
        {
          this.props.updateErrors &&
          <ErrorModal errors={this.props.updateErrors} />
        }

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
                <Button
                  color="primary"
                  size="sm"
                  onClick={this.saveChanges}
                >
                  {
                    (this.props.updateLoading) ? (
                      <>
                        <i className="fas fa-circle-notch fa-spin" />{" "}
                        Loading...
                      </>
                    ) : (
                      <>Save Changes</>
                    )
                  }
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">Panel Permissions</h6>
              <div className="pl-lg-4">
                <Row>
                  {
                    panelPermissions.map((permission, key) => (
                      <AdminPermissionCheckbox
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
                        GUID
                      </label>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        placeholder="GUID"
                        innerRef={this.guid}
                        value={(selectedAdmin.player) ? selectedAdmin.player.guid : undefined}
                      />
                    </FormGroup>
                  </Col>
                  {
                    gamePermissions.map((permission, key) => (
                      <AdminPermissionCheckbox
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
            </Form>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default EditAdminPermissions;