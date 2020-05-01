import React, { Fragment } from "react";
import "./Footer.scss";

class Footer extends React.Component {
  state = {};
  render() {
    return (
      <Fragment>
        <footer>
          <p className="footer-links">
            <a
              href="https://github.com/paragrajhans/shopping-cart"
              target="_blank"
            >
              View Source on Github
            </a>
            <span> / </span>
            <a href="mailto:prajhan1@binghamton.edu" target="_blank">
              Need any help?
            </a>
          </p>
          <p>
            &copy; 2020 <strong>Shopazon</strong>
          </p>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;
