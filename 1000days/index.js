/*
var firebaseConfig = {
  apiKey: "AIzaSyB9cJDhfddv6zk9cQ_1sfEmPpmuIoLAZXg",
  authDomain: "days-97456.firebaseapp.com",
  databaseURL: "https://days-97456.firebaseio.com",
  projectId: "days-97456",
  storageBucket: "days-97456.appspot.com",
  messagingSenderId: "618881433375",
  appId: "1:618881433375:web:93ba886ad1f9f921923a2a",
  measurementId: "G-VBZRWNQSPV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth=firebase.auth();

function signup() {
  var email=document.getElementById("email_field");
  var pass=document.getElementById("pass_field");
  const promise=auth.createUserWithEmailAndPassword(email.value,pass.value);
  promise.catch(e => alert(e.message));
  alert("Signed Up "+email.value);
}

function signin() {
  var email=document.getElementById("email_field");
  var pass=document.getElementById("pass_field");
  const promise=auth.signInWithEmailAndPassword(email.value , pass.value);
  promise.catch(e => alert(e.message));
  alert("Signed In "+email.value);
}

function signout() {
  auth.signOut();
  alert("Signed Out");
}

auth.onAuthStateChanged(function(user) {
  if (user) {
    var email=user.email;
    //alert("Active user : "+email);
    document.getElementById("email_field").style.display="none";
    document.getElementById("pass_field").style.display="none";
  } else {
    //alert("Please Log In");
  }
});
*/
