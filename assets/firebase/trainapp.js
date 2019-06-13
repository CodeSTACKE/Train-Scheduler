var firebaseConfig = {
    apiKey: "AIzaSyA0xYXbdvpRehSSzmIjr6aJk7JhkcQBmVg",
    authDomain: "test-4bf1e.firebaseapp.com",
    databaseURL: "https://test-4bf1e.firebaseio.com",
    projectId: "test-4bf1e",
    storageBucket: "test-4bf1e.appspot.com",
    messagingSenderId: "861946263279",
    appId: "1:861946263279:web:671806af2e93339f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   // Create a variable to reference the database.
   var database = firebase.database();
   // Initial Values
   var trainname = "";
   var desti = "";
   var trainstart = "";
   var frequency = 0;
   var nextarrival=0;
   var minutesaway="";
   var traintime;
   // Capture Button Click
 $(document).on("click","#add-train", function(event) {
    event.preventDefault();
    // debugger;
    // Grabbed values from text boxes
    trainname = $("#train-name").val().trim();
    console.log(trainname);
    desti = $("#train-dest").val().trim();
    console.log(desti);
    traintime = $("#train-time").val().trim();
    console.log(traintime);
   frequency = $("#train-freq").val().trim();
   console.log(frequency);
   
   database.ref().push({
    Trainname: trainname,
    destination: desti,
    traintime: traintime,
    frequency: frequency,
   
  });
  $("#train-name").val("");
  $("#train-dest").val("");
  $("#train-time").val("");
  $("#train-freq").val("");

  
});
// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
      console.log(sv.Trainname);
      console.log(sv.destination);
      console.log(sv.traintime);
      console.log(sv.frequency);
      console.log(sv);
      var tr= $("<tr>");
      var td=$("td");
      td.append(sv.Trainname,sv.destination,sv.traintime,sv.frequency);
      tr.append(td);
      $("#tbody").append(tr);

});