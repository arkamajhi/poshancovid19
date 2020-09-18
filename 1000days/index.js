

var user = firebase.auth().currentUser;

if (user) {
  document.getElementById("login_div").style.display="block";
  document.getElementById("user_div").style.display="none";
} else {
  document.getElementById("login_div").style.display="none";
  document.getElementById("user_div").style.display="block";
}

function login() {
  var userEmail=document.getElementById("email_field").value;
  var userPass=document.getElementById("pass_field").value;

  window.alert(userEmail+" "+userPass);
}
