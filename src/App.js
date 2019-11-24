import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helper/auth";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import rrfProps from "./config";
import store from "./store";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/clients/AddClient";
import ClientsDetail from "./components/clients/ClientsDetail";
import EditClient from "./components/clients/EditClient";
import LogIn from "./components/auth/LogIn";
import Settings from "./components/settings/Settings";
import Registration from "./components/auth/Registration";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="App">
              <AppNavbar />
              <div className="container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={UserIsAuthenticated(Dashboard)}
                  />
                  <Route
                    exact
                    path="/client/add"
                    component={UserIsAuthenticated(AddClient)}
                  />
                  <Route
                    exact
                    path="/client/:id"
                    component={UserIsAuthenticated(ClientsDetail)}
                  />
                  <Route
                    exact
                    path="/client/edit/:id"
                    component={UserIsAuthenticated(EditClient)}
                  />
                  <Route
                    exact
                    path="/login"
                    component={UserIsNotAuthenticated(LogIn)}
                  />
                  <Route
                    exact
                    path="/registration"
                    component={UserIsNotAuthenticated(Registration)}
                  />
                  <Route
                    exact
                    path="/settings"
                    component={UserIsAuthenticated(Settings)}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
