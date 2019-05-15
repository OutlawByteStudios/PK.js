import React from 'react';

import { Container } from 'reactstrap';

import { generalRoutes, serverRoutes } from '../routes';

import Navbar from './navbar';
import Footer from './footer';
import Sidebar from './sidebar/index';

class Admin extends React.Component {
  componentDidUpdate() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getBrandText(){
    for(let route of generalRoutes){
      if(this.props.match.path === route.path) return route.name;
    }
    for(let route of serverRoutes){
      if(this.props.match.path === route.path) return route.name;
    }
    return "Brand";
  };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
        />
        <div className="main-content" ref="mainContent">
          <Navbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          {this.props.children}
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default Admin;