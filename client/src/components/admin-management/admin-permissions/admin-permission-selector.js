import React from 'react';
import {
  Col,
  Row
} from 'reactstrap';

class AdminPermissionSelector extends React.Component{
  constructor(){
    super();
    this.onAccessChange = this.onAccessChange.bind(this);
    this.onAssignAccessChange = this.onAssignAccessChange.bind(this);
  }

  onAccessChange(event){
    this.props.onChange(this.props.permission, (event.target.checked) ? 1 : 0);
  }

  onAssignAccessChange(event){
    this.props.onChange(this.props.permission, (event.target.checked) ? 2 : 1);
  }

  render(){
    const { permission, selectedAdmin, currentAdmin } = this.props;

    return (
      <Col md="6" lg="6" xl="4">
        <Row><Col><h4>{this.props.label}</h4></Col></Row>
        <Row>
          <Col>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                type="checkbox"
                checked={selectedAdmin[permission] > 0}
                disabled={
                  (permission === 'manageAssignPermissions' && currentAdmin.manageAssignPermissions < 2) ||
                  (permission !== 'manageAssignPermissions' &&
                    (
                      (selectedAdmin[permission] < 2 && currentAdmin[permission] < 2 && currentAdmin.manageAssignPermissions < 1) ||
                      (selectedAdmin[permission] > 1 && (selectedAdmin.manageAssignPermissions > 0 || currentAdmin.manageAssignPermissions < 1))
                    )
                  ) ||
                  selectedAdmin.admin.steamID === currentAdmin.admin.steamID
                }
                onChange={this.onAccessChange}
                id={this.props.permission+'access'}
              />
              <label className="custom-control-label" htmlFor={this.props.permission+'access'}>
                Access
              </label>
            </div>
          </Col>
          <Col>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                type="checkbox"
                checked={selectedAdmin[permission] > 1}
                disabled={
                  (permission === 'manageAssignPermissions' && currentAdmin.manageAssignPermissions < 2) ||
                  (permission !== 'manageAssignPermissions' && (selectedAdmin.manageAssignPermissions > 0 || currentAdmin.manageAssignPermissions < 1))||
                  selectedAdmin.admin.steamID === currentAdmin.admin.steamID
                }
                onChange={this.onAssignAccessChange}
                id={this.props.permission+'assignaccess'}
              />
              <label className="custom-control-label" htmlFor={this.props.permission+'assignaccess'}>
                Give Access
              </label>
            </div>
          </Col>
        </Row>
      </Col>
    ) ;
  }
}

export default AdminPermissionSelector;