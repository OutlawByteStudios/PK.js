import React from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';

import { PLAYER_STATS_GRAPH } from '../../../graphql/queries';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

class PlayerStatsGraph extends React.Component{
  state = {
    mode: 'month'
  };

  constructor(){
    super();
    this.onModeChange = this.onModeChange.bind(this);
  }

  onModeChange(mode){
    this.setState({ mode });
  }

  statName(stat){
    switch (stat) {
      case 'totalGold':
        return 'Total Gold';
      default:
        return 'unknown';
    }
  }

  formatData(dataPoints){
    let formatString;
    switch(this.state.mode){
      case 'month':
        formatString = 'DD/MM';
        break;
      case 'week':
        formatString = 'HH:mm dddd';
        break;
      case 'day':
        formatString = 'HH:mm';
        break;
      default:
        formatString = 'DD/MM';
    }

    let labels = [];
    let data = [];
    for(let dataPoint of dataPoints){
      labels.push(moment(dataPoint.date).format(formatString));
      data.push(dataPoint[this.props.stat]);
    }


    return {
      labels,
      datasets: [
        {
          data
        }
      ]
    }
  }

  render(){
    let startDate = moment();
    let stopDate = moment();
    switch(this.state.mode){
      case 'month':
        startDate = startDate.subtract(1, 'months');
        break;
      case 'week':
        startDate = startDate.subtract(1, 'weeks');
        break;
      case 'day':
        startDate = startDate.subtract(1, 'days');
        break;
      default:
        startDate = startDate.subtract(1, 'months');
    }

    return (
      <Query
        query={PLAYER_STATS_GRAPH}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID,
          guid: this.props.guid,
          startDate,
          stopDate
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader statName={this.statName(this.props.stat)} />;
          if(error) return <Error statName={this.statName(this.props.stat)} />;

          if(data.adminPermission.viewServerStats === 0) return <NoPermission statName={this.statName(this.props.stat)} />;

          data = this.formatData(data.server.player.playerStats);

          return (
            <Component
              statName={this.statName(this.props.stat)}
              mode={this.state.mode}
              onModeChange={this.onModeChange}
              data={data}
            />
          );
        }}
      </Query>
    );
  }
}

export default PlayerStatsGraph;