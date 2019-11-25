import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyAction";
import Alert from "../layout/Alert";

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { firebase, notifyUser } = this.props;

    firebase
      .login({
        email,
        password
      })
      .catch(err => notifyUser("Invalid credentials given!!", "error"));
  };
  render() {
    const { message, messageType } = this.props.notify;
    const { disableBalanceOnAdd } = JSON.parse(
      localStorage.getItem("settings")
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <h1 className="text-center pb-4 pt-4">
                  <span className="text-primary">
                    <i className="fa fa-lock" /> Login
                  </span>
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <input
                    className="btn btn-primary btn-block"
                    type="submit"
                    value="Login"
                  />
                </form>
                {disableBalanceOnAdd ? (
                  <Link to="/registration">Register Now!</Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateTOProps = state => {
  const { notify } = state;
  return { notify };
};

export default compose(
  firebaseConnect(),
  connect(mapStateTOProps, { notifyUser })
)(LogIn);
