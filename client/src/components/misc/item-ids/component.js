import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Table
} from 'reactstrap';


class Component extends React.Component{
  state = {
    search: ''
  };

  render(){
    return (
      <Card className="shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Item IDs</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className="bg-secondary shadow">
          <Row>
            <Col>
              <label
                className="form-control-label"
              >
                Item Name
              </label>
              <Input
                className="form-control-alternative"
                type="text"
                value={this.state.search}
                onChange={event => this.setState({ search: event.target.value })}
              />
            </Col>
          </Row>
        </CardBody>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.items.map((item, key) => {
              if(!item.name.toLowerCase().includes(this.state.search.toLowerCase())) return null;
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                </tr>
              );
            })
          }
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default Component;