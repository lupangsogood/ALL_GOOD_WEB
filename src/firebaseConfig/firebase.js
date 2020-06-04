import firebase from "firebase"
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

firebase.initializeApp(config)
firebase.analytics()

const db = firebase.firestore()

export { firebase, db }
