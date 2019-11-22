import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    balance: "",
    phone: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;
    const { firestore } = this.props;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    firestore.add({ collection: "clients" }, newClient);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <Link to="/">
          <i className="fas fa-arrow-circle-left"></i>Back to Dashboard
        </Link>
        <h1 className="mx-auto mt-10 mb-10">Add Client</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={this.onChange}
              name="firstName"
              value={this.state.firstName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={this.onChange}
              name="lastName"
              value={this.state.lastName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={this.onChange}
              name="email"
              value={this.state.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="balance">Balance</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={this.onChange}
              name="balance"
              value={this.state.balance}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={this.onChange}
              name="phone"
              value={this.state.phone}
              required
            />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Submit"
          ></input>
        </form>
      </div>
    );
  }
}

export default firestoreConnect()(AddClient);
