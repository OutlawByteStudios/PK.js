import React from 'react';
import { Mutation } from 'react-apollo';

import { UN_BAN } from '../../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../../misc/modals/error-modal';
import Component from './component';

class UnBan extends React.Component {
  render() {
    return (
      <Mutation
        mutation={UN_BAN}
        onError={() => {}}
      >
        {(deleteBan, { loading, error }) => {
          if (loading) return <Loader/>;

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  deleteBan({
                    variables: {
                      ...variables,
                      banID: this.props.banID
                    }
                  });
                }}
              />
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default UnBan;