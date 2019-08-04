import React from 'react';
import {
  Col,
  Row
} from 'reactstrap';

import { assignPermissionCheck } from 'shared/constants';

class AdminPermissionCheckbox extends React.Component{
  constructor(){
    super();
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange(event, value){
    this.props.onChange(this.props.permission, (event.target.checked) ? value : value - 1);
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
                onChange={event => this.onCheckboxChange(event, 1)}
                checked={selectedAdmin[permission] > 0}
                disabled={!assignPermissionCheck(currentAdmin, selectedAdmin, permission)}
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
                onChange={event => this.onCheckboxChange(event, 2)}
                checked={selectedAdmin[permission] > 1}
                disabled={!assignPermissionCheck(currentAdmin, selectedAdmin, permission, true)}
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

export default AdminPermissionCheckbox;