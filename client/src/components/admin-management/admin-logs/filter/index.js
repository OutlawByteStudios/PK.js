import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row
} from 'reactstrap';

import logTypes from '../log-types';

import SelectAdmin from '../../select-admin';

class AdminLogsFilter extends React.Component{
  render(){
    return (
      <Row>
        <Col>
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <h3 className="mb-0">Admin Log Search</h3>
            </CardHeader>
            <CardBody>
              <h6 className="heading-small text-muted mb-2">Select Admin</h6>
              <Row className="pl-lg-4">
                <Col>
                  <SelectAdmin
                    serverID={this.props.serverID}
                    selectedAdmin={this.props.selectedAdmin}
                    onChange={this.props.updateSelectedAdmin}
                  />
                </Col>
              </Row>
              <h6 className="heading-small text-muted my-2">Filter Log Types</h6>
              <Row className="pl-lg-4">
                {
                  logTypes.map((logType, key) => (
                    <Col sm="6" md="4" lg="3" key={key}>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          onChange={event => this.props.updateFilter(logType.type, event.target.checked)}
                          checked={this.props.filter[logType.type]}
                          id={logType.type}
                        />
                        <label className="custom-control-label" htmlFor={logType.type}>
                          {logType.name}
                        </label>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default AdminLogsFilter;