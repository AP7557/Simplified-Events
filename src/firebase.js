import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyApXF4J4ygO4mLYvC_CWN8w0avHXq029wQ",
  authDomain: "simplified-events.firebaseapp.com",
  databaseURL: "https://simplified-events.firebaseio.com",
  projectId: "simplified-events",
  storageBucket: "simplified-events.appspot.com",
  messagingSenderId: "621508160242",
  appId: "1:621508160242:web:ad657326a510cdfd3efe6b",
  measurementId: "G-LQVPVV1QZF"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

export {auth}