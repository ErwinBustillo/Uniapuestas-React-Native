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
        uid: firebase.auth().currentUser.uid, //No es necesario ya que la raiz contiene el token
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
  var temp = betRef.child(firebase.auth().currentUser.uid).push();
  return temp.set({
    matchUid: bet.match_uid,
    home_score: bet.home_score,
    away_score: bet.away_score,
    id: temp.key
  })
  //return betRef.child(firebase.auth().currentUser.uid).push().set(bet)
}

export function readBets() {
  return betRef.child(firebase.auth().currentUser.uid)
}

export function readMatches() {
  return matchRef
}

export function readMatch(matchUid) {
  return matchRef.child(matchUid)
}

export function closeMatch(matchUid,home_score,away_score) {
  const promise = new Promise((resolve, reject) => {
    matchRef.child(matchUid).update({
      status: "closed",
      final_score_team_a:home_score,
      final_score_team_b:away_score
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

export function updateUserCounterInMatches(match_uid, home_score, away_score) {
  const promise = new Promise((resolve, reject) => {
    matchRef.child(match_uid).once('value', snapshot => {
      const match = snapshot.val();
      var team_a = 0;
      var team_b = 0;
      var draws = 0;
      if (match.team_a != null && match.team_b != null && match.draws != null) {
        ({team_a, team_b, draws} = match); 
      }
      if(home_score > away_score) {
        team_a++;
      } else if (home_score < away_score) {
        team_b++;
      } else {
        draws++
      }
      matchRef.child(match_uid).update({
        team_a: team_a,
        team_b: team_b,
        draws: draws
      }).then(() => {
        resolve({ success: true });
      });
    });
  });
  return promise;
}

export function updateBet(betid,home_value, away_value){
    const promise = new Promise((resolve, reject)=>{
        betRef.child(firebase.auth().currentUser.uid).child(betid).update({
          home_score:home_value,
          away_score:away_value
        }).then(()=> resolve({success: true}))
        .catch((err)=>reject(err));
    })
    return promise;
}