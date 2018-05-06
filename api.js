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
const betRef = firebase.database().ref('/bets');
const matchRef = firebase.database().ref('/matches');

export function logOut() {
  return firebase.auth().signOut()
}

// login trae el user de firebase con el uid token
export function logIn(email,password) {
  return firebase.auth().signInWithEmailAndPassword(email,password)
}

// registra el usuario en firebase auth luego debe salvar el usuario en db con el metodo set y que tenga de llave el uid de el
export function signUp(user) {
  return firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
}


export function loadUserData(userId){
  return userRef.child(userId)
}

export function createUserInDatabase(newUser) {
  const promise = new Promise((resolve, reject) => {
    firebase.auth().currentUser.updateProfile({
      displayName: newUser.displayName,      
    })
    .then(() => {
      userRef.child(firebase.auth().currentUser.uid).set( {
        //uid: firebase.auth().currentUser.uid, //No es necesario ya que la raiz contiene el token
        displayName: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        role: 'user',
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
  return promise;
}

//promise que escucha 
export let isAuthenticated = new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged((user)=> {
    resolve(user)
    })
});

export function createBet(bet) {
  return betRef.child(firebase.auth().currentUser.uid).push().set(bet)
}

export function readBets() {
  return betRef.child(firebase.auth().currentUser.uid)
}

export function readMatches() {
  return matchRef
}

export function closeMatch(matchUid) {
  const promise = new Promise((resolve, reject) => {
    matchRef.child(matchUid).update({
      status: "closed"
    })
    .then(() => {
      betRef.on('value', snapshot => {
        console.log(snapshot.val());
      });
      resolve({ success: true });
    })
    .catch((error) => reject(error));
  });
  return promise;
}