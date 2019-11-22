import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "./Spinner";

class Client extends Component {
  render() {
    const { clients } = this.props;
    const totalOwed = (total, man) => total + parseFloat(man.balance);

    if (clients) {
      return (
        <div>
          <div className="row">
            <h4 className="mx-auto">
              Total Owed: {clients.reduce(totalOwed, 0).toFixed(2)}
            </h4>

            <table className="table table-bordered mt-10">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Balance</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.phone}</td>
                    <td>{client.email}</td>
                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-info btn-md"
                      >
                        <i className="fas fa-arrow-circle-right">Details</i>
                      </Link>
                    </td>
                  </tr>
                ))}
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

const mapStateToProps = state => {
  const clients = state.firestore.ordered.clients;
  return {
    clients: clients
  };
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect(mapStateToProps)
)(Client);
