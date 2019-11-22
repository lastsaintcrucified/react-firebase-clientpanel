import firebase from "firebase";
import { createFirestoreInstance } from "redux-firestore";
import store from "./store";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

export default rrfProps;
