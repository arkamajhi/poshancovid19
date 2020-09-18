firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("login_div").style.display="initial";
    document.getElementById("user_div").style.display="none";
  } else {
    document.getElementById("login_div").style.display="none";
    document.getElementById("user_div").style.display="initial";
  }
});

function login() {
  var userEmail=document.getElementById("email_field").value;
  var userPass=document.getElementById("pass_field").value;

  window.alert(userEmail+" "+userPass);
}
