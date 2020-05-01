import React, { Fragment } from "react";
import "./Logo.scss";
import { Shopazon } from "../../data/logo.png";

class Logo extends React.Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="row justify-content-center">
          <div
            className="col-3"
            style={{
              textAlign: "center",
              position: "absolute",
              top: "0",
              marginTop: "15%",
            }}
          >
            <span className="logo-header">Shopazon</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Logo;
