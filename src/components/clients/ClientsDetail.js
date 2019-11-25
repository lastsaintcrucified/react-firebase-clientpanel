import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "./Spinner";

class ClientsDetail extends Component {
  state = {
    displayUpdate: false,
    updateAmount: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const newBalance = this.state.updateAmount;
    const { firestore } = this.props;
    const clientUpdate = {
      balance: newBalance
    };
    firestore.update({ collection: "clients", doc: id }, clientUpdate);
    this.setState({ displayUpdate: false });
  };

  onDelete = () => {
    const id = this.props.match.params.id;
    const { firestore, history } = this.props;
    firestore
      .delete({ collection: "clients", doc: id })
      .then(history.push("/"));
  };

  toggleDisplay = () => {
    this.setState({ displayUpdate: true });
  };

  render() {
    const { client } = this.props;
    const id = this.props.match.params.id;
    const { displayUpdate, updateAmount } = this.state;
    var updateForm = "";
    const { disableBalanceOnEdit } = JSON.parse(
      localStorage.getItem("settings")
    );
    if (displayUpdate) {
      updateForm = (
        <form onSubmit={this.onSubmit} className="my-4">
          <input
            className="form-control"
            type="text"
            name="updateAmount"
            disabled={disableBalanceOnEdit ? "disabled" : null}
            value={updateAmount}
            placeholder={client.balance}
            onChange={this.onChange}
          />
          <button className="btn btn-sm btn-primary my-2" type="submit">
            update
          </button>
        </form>
      );
    } else {
      updateForm = null;
    }
    if (client) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <Link to="/">
                <i className="fas fa-arrow-circle-left">Back to Dashboard</i>
              </Link>
            </div>
            <div className="col-md-2">
              <Link
                to={`/client/edit/${id}`}
                className="btn btn-md btn-outline-secondary mr-1"
              >
                Edit
              </Link>
              <Link
                to="/"
                className="btn btn-md btn-outline-danger"
                onClick={this.onDelete}
              >
                Delete
              </Link>
            </div>
          </div>
          <div className="row my-4">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Client Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{id}</td>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>
                    <strong>{parseFloat(client.balance).toFixed(2)}</strong>
                    <button onClick={this.toggleDisplay} className="mx-4">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    {updateForm}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
)(ClientsDetail);
