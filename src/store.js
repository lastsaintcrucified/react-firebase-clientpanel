import { createStore, combineReducers } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMs4iyLcn_Tb0Imq6MG5sJ_fYx2VAQ9yY",
  authDomain: "react-fb-clientspanel.firebaseapp.com",
  databaseURL: "https://react-fb-clientspanel.firebaseio.com",
  projectId: "react-fb-clientspanel",
  storageBucket: "react-fb-clientspanel.appspot.com",
  messagingSenderId: "985309797763",
  appId: "1:985309797763:web:41d78dc61aa9ed78cfaab6",
  measurementId: "G-5KEH1KNJ5F"
};

// react-redux-firebase config

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

//Initialize firestore
// const firestore = firebase.firestore();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//Create Initial state
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;