import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <Link to="/client/add" className="btn btn-outline-success btn-block">
        <i className="fas fa-plus"></i>New
      </Link>
    );
  }
}
export default Sidebar;
