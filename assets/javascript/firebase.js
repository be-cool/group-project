var config = {
    apiKey: "AIzaSyBjA3IN-109oI4w7mQV83I2TXV6sNIO64g",
    authDomain: "group-project1-aa81a.firebaseapp.com",
    databaseURL: "https://group-project1-aa81a.firebaseio.com",
    projectId: "group-project1-aa81a",
    storageBucket: "",
    messagingSenderId: "1002328856448",
    appId: "1:1002328856448:web:60a681cb08c0bc50"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    var dateSearch = $("#example-date-input").val().trim();
    var citySearch = $("#inputGroupSelect04").val().trim();
  
    var findBtn = {
     date: dateSearch,
     location: citySearch
    };
    database.ref("/user-search").push(findBtn);
    console.log(findBtn.date);
  }); 
  