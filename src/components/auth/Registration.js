import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class Registration extends Component {
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
    const { firebase } = this.props;

    firebase
      .createUser({ email, password })
      .catch(err => alert("user already exist"));
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-4">
                  <span className="text-primary">
                    <i className="fa fa-lock" /> Registration
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
                    value="Register"
                  />
                </form>
                <Link to="/login">Go to Login page</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firebaseConnect()(Registration);
