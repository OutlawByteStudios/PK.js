import React from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';

import {
  parseOptions,
  chartOptions,
  statsGraph
} from '../charts';


import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Nav,
  NavItem
} from 'reactstrap';


class Component extends React.Component{
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  render(){
    return (
      <Card className="bg-gradient-default shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h6 className="text-uppercase text-light ls-1 mb-1">
                Player Stats
              </h6>
              <h2 className="text-white mb-0">{this.props.statName}</h2>
            </div>
            <Col>
              <Nav className="justify-content-end" pills>
                <NavItem>
                  <Button
                    size="sm"
                    color={this.props.mode === 'year' ? 'primary' : 'secondary'}
                    className="py-2 px-3"
                    onClick={() => this.props.onModeChange('year')}
                  >
                    <span className="d-none d-md-block">Year</span>
                    <span className="d-md-none">Y</span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    size="sm"
                    color={this.props.mode === 'month' ? 'primary' : 'secondary'}
                    className="py-2 px-3"
                    onClick={() => this.props.onModeChange('month')}
                  >
                    <span className="d-none d-md-block">Month</span>
                    <span className="d-md-none">M</span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    size="sm"
                    color={this.props.mode === 'week' ? 'primary' : 'secondary'}
                    className="py-2 px-3"
                    onClick={() => this.props.onModeChange('week')}
                  >
                    <span className="d-none d-md-block">Week</span>
                    <span className="d-md-none">W</span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    size="sm"
                    color={this.props.mode === 'day' ? 'primary' : 'secondary'}
                    className="py-2 px-3"
                    onClick={() => this.props.onModeChange('day')}
                  >
                    <span className="d-none d-md-block">Day</span>
                    <span className="d-md-none">D</span>
                  </Button>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {/* Chart */}
          <div className="chart">
            <Line
              data={this.props.data}
              options={statsGraph.options}
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Component;