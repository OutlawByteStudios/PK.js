import React from 'react';
import { withApollo } from 'react-apollo';
import AsyncSelect from 'react-select/lib/Async';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Row
} from 'reactstrap';

import query from './query';

class PlayerSelector extends React.Component {
  state = {
    search: "",
    searchType: "both",
    player: null
  };

  constructor(){
    super();
    this.searchUpdate = this.searchUpdate.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);

  }

  componentDidMount(){
    if(this.props.defaultGuid !== null) this.setState({
      search: this.props.defaultGuid,
      player: this.props.defaultGuid
    });
  }

  async searchUpdate(search){
    const { data } = await this.props.client.query({
      query,
      variables: {
        serverID: parseInt(this.props.serverID),
        search
      }
    });

    const options = [];

    for(let playerName of data.server.playerNames){
      options.push({
        value: playerName.player.guid,
        label: 'Name: ' + playerName.name
      });
    }

    for(let player of data.server.players){
      options.push({
        value: player.guid,
        label: 'GUID: ' + player.guid
      });
    }

    return options;
  }

  handleSearchTypeChange(event){
    this.setState({ searchType: event.target.value });
  }

  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Player Search</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Search
                    </label>
                    <AsyncSelect
                      className="form-control-alternative"
                      loadOptions={this.searchUpdate}
                      defaultOptions={(this.state.search !== "") ? [{ value: this.state.search, label: 'GUID: ' + this.state.search }] : null}
                      defaultValue={(this.state.search !== "") ? { value: this.state.search, label: 'GUID: ' + this.state.search } : null}
                      onChange={(option) => {this.props.onChange(option.value)}}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default withApollo(PlayerSelector);
