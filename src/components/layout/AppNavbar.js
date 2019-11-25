import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
  onLogOutClick = e => {
    e.preventDefault();
    const { firebase } = this.props;

    firebase.logout();
  };

  render() {
    const { auth } = this.props;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary mb-4">
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

            {auth.uid !== undefined ? (
              <div className="collapse navbar-collapse " id="navbarMain">
                <ul className="navbar-nav mr-auto float-right">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#!" className="nav-link">
                      {auth.email}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="nav-link"
                      onClick={this.onLogOutClick}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const { settings } = state.settings;
  return {
    auth: auth,
    settings: settings
  };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(AppNavbar);
