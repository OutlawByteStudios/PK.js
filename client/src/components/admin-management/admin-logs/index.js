import React from 'react';
import { Query } from 'react-apollo';

import {
  Col,
  Row
} from 'reactstrap';

import logTypes from './log-types';

import Filter from './filter';

import { ADMIN_LOGS } from '../../../graphql/queries';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

class AdminLogs extends React.Component{
  constructor(){
    super();
    let filter = {};
    logTypes.forEach(logType => filter[logType.type] = true);

    this.state = {
      selectedAdmin: null,
      filter,
      startingAfter: null,
      endingBefore: null,
      page: 1
    };

    this.pageChange = this.pageChange.bind(this);
  }

  pageChange(up, _id){
    let page;
    if(up) page = this.state.page + 1;
    else page = this.state.page - 1;

    if(page === 1) this.setState({ startingAfter: null, endingBefore: null, page});
    else if(up) this.setState({ startingAfter: null, endingBefore: _id, page });
    else this.setState({ startingAfter: _id, endingBefore: null, page });
  }

  render(){
    return (
      <>
        <Row>
          <Col>
            <Filter
              serverID={this.props.serverID}
              selectedAdmin={this.state.selectedAdmin}
              updateSelectedAdmin={selectedAdmin => this.setState({ selectedAdmin })}
              filter={this.state.filter}
              updateFilter={(type, value) => this.setState({ filter: { ...this.state.filter, [type]: value } })}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Query
              query={ADMIN_LOGS}
              variables={{
                serverID: this.props.serverID,
                steamID: Auth.claim.steamID,
                admin: this.state.selectedAdmin,
                filter: Object.keys(this.state.filter).filter(key => this.state.filter[key]),
                startingAfter: this.state.startingAfter,
                endingBefore: this.state.endingBefore
              }}
              onError={() => {}}
            >
              {({ loading, error, data }) => {
                if(loading) return <Loader />;
                if(error) return <Error />;

                if(data.adminPermission.viewAdminLogs === 0) return <NoPermission/>;

                return (
                  <Component
                    adminLogs={data.server.adminLogs}
                    page={this.state.page}
                    pageChange={this.pageChange}
                  />
                );
              }}
            </Query>
          </Col>
        </Row>
      </>
    );
  }

}

export default AdminLogs;