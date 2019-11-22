import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="conatiner">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="navbar-brand ">
                ClientPanel
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarMain"
                type="button"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </li>

            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AppNavbar;
