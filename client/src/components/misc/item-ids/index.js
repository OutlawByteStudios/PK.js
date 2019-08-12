import React from 'react';
import { Query } from 'react-apollo';

import { ITEM_IDS } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class ItemIDs extends React.Component{
  render(){
    return (
      <Query
        query={ITEM_IDS}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          return (
            <Component
              items={data.items}
            />
          );
        }}
      </Query>
    );
  }
}

export default ItemIDs;