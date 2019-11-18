import React from 'react';
import { Mutation } from 'react-apollo';

import {
  Button
} from 'reactstrap';

import { SAVE_CUSTOM_BAN_LIST } from '../../../../../graphql/mutations';

import ErrorModal from '../../../../misc/modals/error-modal';

class SaveCustomBanList extends React.Component{
  render(){
    return (
      <Mutation
        mutation={SAVE_CUSTOM_BAN_LIST}
        onError={() => {}}
      >
        {(saveCustomBanList, { loading, error }) => (
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="primary"
              onClick={() => {
                saveCustomBanList({
                  variables: {
                    serverID: this.props.serverID,
                    customBanList: this.props.customBanList
                  }
                })
              }}
            >
              {
                (loading) ?
                  (
                    <>
                      <i className="fas fa-circle-notch fa-spin" />{" "}
                      Loading...
                    </>
                  ) : (
                    <>Save Changes</>
                  )
              }
            </Button>
          </>
        )}
      </Mutation>
    );
  }
}

export default SaveCustomBanList;