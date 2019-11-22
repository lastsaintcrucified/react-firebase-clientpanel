import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "./Spinner";

class ClientsDetail extends Component {
  render() {
    const { client } = this.props;
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
                to="/client/edit/:id"
                className="btn btn-md btn-outline-secondary mr-1"
              >
                Edit
              </Link>
              <Link
                to="/client/delete/:id"
                className="btn btn-md btn-outline-danger"
              >
                Delete
              </Link>
            </div>
          </div>
          <div className="row my-4">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>
                    <strong>{parseFloat(client.balance).toFixed(2)}</strong>
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
