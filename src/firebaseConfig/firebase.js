import firebase from "firebase"

const config = {
  apiKey: "AIzaSyC2FB-uk1TPRrNlhsBhznKyrU1JMZAMYzw",
  authDomain: "tutornearme-5734f.firebaseapp.com",
  databaseURL: "https://tutornearme-5734f.firebaseio.com",
  projectId: "tutornearme-5734f",
  storageBucket: "tutornearme-5734f.appspot.com",
  messagingSenderId: "1074827667700",
  appId: "1:1074827667700:web:6ceeb9a97ce0a3988456a1",
  measurementId: "G-4VRC3SVZJF"
}

firebase.initializeApp(config)
firebase.analytics()

const db = firebase.firestore()

export { firebase, db }
