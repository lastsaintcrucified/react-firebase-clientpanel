import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from "../../actions/settingsAction";

class Settings extends Component {
  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = JSON.parse(localStorage.getItem("settings"));
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" aria-hidden="true" />
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <span>Edit Settings</span>
            <form>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={allowRegistration ? "checked" : null}
                  id="allowRegistration"
                  name="allowRegistration"
                  onChange={this.allowRegistrationChange}
                />
                <label className="form-check-label" htmlFor="allowRegistration">
                  Allow Registration
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={disableBalanceOnAdd ? "checked" : null}
                  id="disableBalanceOnAdd"
                  name="disableBalanceOnAdd"
                  onChange={this.disableBalanceOnAddChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="disableBalanceOnAdd"
                >
                  Disable Balance On Add{" "}
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  id="disableBalanceOnEdit"
                  type="checkbox"
                  checked={disableBalanceOnEdit ? "checked" : null}
                  name="disableBalanceOnEdit"
                  onChange={this.disableBalanceOnEditChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="disableBalanceOnEdit"
                >
                  Disable Balance On Edit{" "}
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state.firebase.auth;
  const { settings } = state.settings;
  return {
    auth: auth,
    settings: settings
  };
};

export default connect(mapStateToProps, {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
})(Settings);
