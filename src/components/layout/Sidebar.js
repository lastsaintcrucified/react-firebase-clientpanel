import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <Link to="/client/add" className="btn btn-dark btn-md ml-4">
        <i className="fas fa-plus"></i>Add
      </Link>
    );
  }
}
export default Sidebar;
