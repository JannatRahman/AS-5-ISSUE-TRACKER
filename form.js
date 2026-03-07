// LOGIN FORM CODES
document.getElementById("login-btn").addEventListener("click", function(){

 const inputUsername = document.getElementById("input-username");

 const username = inputUsername.value;
 console.log(username);

 const inputPassword = document.getElementById("input-password");
 const password = inputPassword.value;
 console.log(password);

if(username == "admin" && password == "admin1234"){
  alert("login successful");
  window.location.assign("/home.html");
}else{
  alert("login failed");
  return;
}

});