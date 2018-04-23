import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBn-2PGpOkQoITEJtQLBWNlTBJBBqNzgLk",
  authDomain: "uniapuestas-a4139.firebaseapp.com",
  databaseURL: "https://uniapuestas-a4139.firebaseio.com",
  projectId: "uniapuestas-a4139",
  storageBucket: "uniapuestas-a4139.appspot.com",
  messagingSenderId: "520436061702"
};
firebase.initializeApp(config);

const userRef = firebase.database().ref('/users');

export function logOut() {
  return firebase.auth().signOut();
}

// login trae el user de firebase con el uid token
export function logIn(user) {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
}

// registra el usuario en firebase auth luego debe salvar el usuario en db con el metodo set y que tenga de llave el uid de el
export function signUp(user) {
  return firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
}

export function createUserInDatabase(newUser) {
  var promise = new Promise((resolve, reject) => {
    firebase.auth().currentUser.updateProfile({
      displayName: newUser.displayName,
      
    })
    .then(() => {
      userRef.child(firebase.auth().currentUser.uid).set( {
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
       
        points: 0
      })
      .then(() => {
        resolve({ success: true });
      })
      .catch(err => {
        reject(err);
      })
    })
  });
}