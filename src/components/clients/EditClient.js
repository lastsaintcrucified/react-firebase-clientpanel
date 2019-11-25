import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "./Spinner";

class EditClient extends Component {
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
    const id = this.props.match.params.id;
    const { firstName, lastName, email, balance, phone } = this.state;
    const { firestore, history } = this.props;
    const clientUpdate = {
      firstName,
      lastName,
      email,
      balance,
      phone
    };
    firestore
      .update({ collection: "clients", doc: id }, clientUpdate)
      .then(history.push("/"));
  };
  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = JSON.parse(
      localStorage.getItem("settings")
    );
    if (client) {
      return (
        <div>
          <Link to="/">
            <i className="fas fa-arrow-circle-left"></i>Back to Dashboard
          </Link>
          <h1 className="mx-auto mt-10 mb-10">UpdateClient</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                onChange={this.onChange}
                name="firstName"
                placeholder={client.firstName}
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
                placeholder={client.lastName}
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
                placeholder={client.email}
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
                disabled={disableBalanceOnEdit ? "disabled" : null}
                name="balance"
                placeholder={client.balance}
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
                placeholder={client.phone}
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
    } else {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const clients = state.firestore.data.clients;
  const id = ownProps.match.params.id;
  const client = clients ? clients[id] : null;
  console.log(clients);
  return {
    client: client
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "clients" }])
)(EditClient);
