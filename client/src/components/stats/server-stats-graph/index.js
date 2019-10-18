import React from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';

import { SERVER_STATS_GRAPH } from '../../../graphql/queries';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

const publicStats = ['playerCount'];

class ServerStatsGraph extends React.Component{
  state = {
    mode: 'day'
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
      case 'uniqueGUIDs':
        return 'Unique GUIDs';
      case 'uniqueIPs':
        return 'Unique IPs';
      case 'adminCount':
        return 'Admin Count';
      case 'totalBans':
        return 'Total Bans';
      case 'totalWarnings':
        return 'Total Warnings';
      case 'totalNotes':
        return 'Total Notes';
      case 'playerCount':
        return 'Player Count';
      case 'totalGold':
        return 'Total Gold';
      case 'totalBankGold':
        return 'Total Bank Gold';
      case 'totalPouchGold':
        return 'Total Pouch Gold';
      case 'bankLimit':
        return 'Bank Limit';
      default:
        return 'unknown';
    }
  }

  formatData(dataPoints){
    let formatString;
    switch(this.state.mode){
      case 'year':
      case 'month':
        formatString = 'DD/MM';
        break;
      case 'week':
        formatString = 'HH:mm dddd';
        break;
      case 'day':
      case 'hour':
        formatString = 'HH:mm';
        break;
      default:
        formatString = 'DD/MM';
    }

    let labels = [];
    let data = [];
    for(let dataPoint of dataPoints){
      labels.push(moment.utc(dataPoint.date).format(formatString));
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
    let startDate = moment.utc();
    let stopDate = moment.utc();
    switch(this.state.mode){
      case 'year':
        startDate = startDate.subtract(1, 'years');
        break;
      case 'month':
        startDate = startDate.subtract(1, 'months');
        break;
      case 'week':
        startDate = startDate.subtract(1, 'weeks');
        break;
      case 'day':
        startDate = startDate.subtract(1, 'days');
        break;
      case 'hour':
        startDate = startDate.subtract(1, 'hours');
        break;
      default:
        startDate = startDate.subtract(1, 'months');
    }

    return (
      <Query
        query={SERVER_STATS_GRAPH}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID,
          startDate,
          stopDate
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader statName={this.statName(this.props.stat)} />;
          if(error) return <Error statName={this.statName(this.props.stat)} />;

          if(
            !publicStats.includes(this.props.stat) &&
            data.adminPermission.viewServerStats === 0
          ) return <NoPermission statName={this.statName(this.props.stat)} />;

          data = this.formatData(data.server.serverStats);

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

export default ServerStatsGraph;