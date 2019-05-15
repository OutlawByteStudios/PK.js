import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Media,
  NavLink,
  Row
} from 'reactstrap';

import { panelPermissions } from 'shared';

const QUERY = gql`
  query AdminPermission($serverID: Int!, $steamID: String!) {
    server(id: $serverID) {
      selectedAdmin: adminPermission(steamID: $steamID) {
        admin {
          steamID
          displayName
          avatar
        }
        
        manageAdminAssignPermissions
        hasViewAdminPermissions
        assignViewAdminPermissions
      }
      currentAdmin: adminPermission(steamID: $steamID) {
        manageAdminAssignPermissions
        hasViewAdminPermissions
        assignViewAdminPermissions  
      }
    }
  }
`;

class AdminPermission extends React.Component{
  render(){
    if(this.props.steamID ===  null) return null;
    return (
      <Query
        query={QUERY}
        variables={{
          serverID: this.props.serverID,
          steamID: this.props.steamID
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return (
            <Card>
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  Loading...
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

          if (error) return (
            <Card>
              <CardBody>
                <Alert color="danger">
                  <i className="fas fa-exclamation-triangle" />{" "}
                  <strong>Error</strong> - Something went wrong.
                </Alert>
              </CardBody>
            </Card>
          );

          const selectedAdmin = data.server.selectedAdmin;
          const currentAdmin = data.server.currentAdmin;

          if(!selectedAdmin) return (
            <Card>
              <CardBody>
                <Alert color="danger">
                  <i className="fas fa-exclamation-triangle" />{" "}
                  <strong>Error</strong> - User is not an admin.
                </Alert>
              </CardBody>
            </Card>
          );

          return (
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <NavLink
                      href={"/admin/profile/" + selectedAdmin.admin.steamID}
                      target="_blank"
                    >
                      <Media className="align-items-center">
                            <span className="avatar avatar-sm rounded-circle">
                              <img
                                alt="..."
                                src={selectedAdmin.admin.avatar}
                              />
                            </span>
                        <Media className="ml-2">
                              <span className="mb-0 text-sm font-weight-bold">
                                {selectedAdmin.admin.displayName}
                              </span>
                        </Media>
                      </Media>
                    </NavLink>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Panel Permissions
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      {
                        panelPermissions.map((permission, key) => (
                          <Col key={key}>
                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                type="checkbox"
                                id={permission.has}
                                defaultChecked={selectedAdmin[permission.has]}
                                disabled={!currentAdmin[permission.assign]}
                              />
                              <label className="custom-control-label" htmlFor={permission.has}>
                                {permission.label}
                              </label>
                            </div>
                          </Col>
                        ))
                      }
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    In-Game Permissions
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                      >
                        GUID
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="GUID"
                        type="text"
                      />
                    </FormGroup>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Manage Panel Permissions
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      {
                        panelPermissions.map((permission, key) => {
                          if(permission.has === 'manageAdminAssignPermissions') return null;
                          return (
                            <Col key={key}>
                              <div className="custom-control custom-checkbox mb-3">
                                <input
                                  className="custom-control-input"
                                  type="checkbox"
                                  id={permission.assign}
                                  defaultChecked={selectedAdmin[permission.assign]}
                                  disabled={!currentAdmin['manageAdminAssignPermissions']}
                                />
                                <label className="custom-control-label" htmlFor={permission.assign}>
                                  {permission.label}
                                </label>
                              </div>
                            </Col>
                          );
                        })
                      }
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Manage In-Game Permissions
                  </h6>
                  <div className="pl-lg-4">
                    <Row>

                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default AdminPermission;