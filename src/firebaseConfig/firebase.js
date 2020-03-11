import firebase from "firebase"

// const config = {
//   apiKey: "AIzaSyC2FB-uk1TPRrNlhsBhznKyrU1JMZAMYzw",
//   authDomain: "tutornearme-5734f.firebaseapp.com",
//   databaseURL: "https://tutornearme-5734f.firebaseio.com",
//   projectId: "tutornearme-5734f",
//   storageBucket: "tutornearme-5734f.appspot.com",
//   messagingSenderId: "1074827667700",
//   appId: "1:1074827667700:web:6ceeb9a97ce0a3988456a1",
//   measurementId: "G-4VRC3SVZJF"
// }

const config = {
  apiKey: "AIzaSyB9Ku0vHMUCLLomdbeUrUQITI9TwQSWlWE",
  authDomain: "allgoodbrownie-1580009020482.firebaseapp.com",
  databaseURL: "https://allgoodbrownie-1580009020482.firebaseio.com",
  projectId: "allgoodbrownie-1580009020482",
  storageBucket: "allgoodbrownie-1580009020482.appspot.com",
  messagingSenderId: "847633376561",
  appId: "1:847633376561:web:c62b1219689a0719307c10",
  measurementId: "G-LB2TGJJM4T"
}

firebase.initializeApp(config)
firebase.analytics()

const db = firebase.firestore()

export { firebase, db }
