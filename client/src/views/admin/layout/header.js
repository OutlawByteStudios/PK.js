import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            backgroundImage:
              "url(" + require("assets/img/theme/cover.png") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center 25%"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
        </div>
      </>
    );
  }
}

export default Header;
