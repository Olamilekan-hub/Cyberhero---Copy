import React from "react";
import { withRouter } from "react-router-dom";
// import { navHeight } from "../constants/constants";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    // console.log("prevProps", prevProps.location.pathname);
    // console.log("nextProps", this.props.location.pathname);
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
