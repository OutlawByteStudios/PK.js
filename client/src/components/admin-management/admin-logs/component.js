import React from 'react';
import moment from 'moment';

import {
  Card,
  CardHeader,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from 'reactstrap';

import logTypes from './log-types';

import SteamUser from '../../misc/steam-user';

class Component extends React.Component{
  constructor(){
    super();
    this.onPageChange = this.onPageChange.bind(this);
  }
  onPageChange(event, up, _id){
    event.preventDefault();
    this.props.pageChange(up, _id);
  }

  render(){
    return (
      <Card>
        <CardHeader>
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Admin Logs</h3>
            </Col>
            <Col>
              {
               this.props.adminLogs.length > 0 &&
               (
                 <Pagination
                   listClassName="justify-content-end"
                 >
                   <PaginationItem
                    disabled={this.props.page === 1}
                   >
                     <PaginationLink
                       onClick={event => this.onPageChange(event, false, this.props.adminLogs[0]._id)}
                     >
                       <i className="fa fa-angle-left" />
                     </PaginationLink>
                   </PaginationItem>
                   <PaginationItem active>
                     <PaginationLink>
                       {this.props.page}
                     </PaginationLink>
                   </PaginationItem>
                   <PaginationItem
                    disabled={!this.props.adminLogs[0].hasMore}
                   >
                     <PaginationLink
                       onClick={event => this.onPageChange(event, true, this.props.adminLogs[this.props.adminLogs.length -1]._id)}
                     >
                       <i className="fa fa-angle-right" />
                     </PaginationLink>
                   </PaginationItem>
                 </Pagination>
               )
              }
            </Col>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive size="sm">
          <thead className="thead-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Admin</th>
            <th scope="col">Log</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.adminLogs.map((adminLog, key) => (
              <tr key={key}>
                <td>{moment.utc(adminLog.date).format('DD/MM/YYYY HH:mm')}</td>
                <td>
                  <SteamUser steamUser={adminLog.admin} />
                </td>
                <td>
                  {logTypes.filter(logType => logType.type === adminLog.type)[0].toString(adminLog)}
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default Component;