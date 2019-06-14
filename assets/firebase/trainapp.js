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
   var trainstart;
   var frequency = 0;
   var trainarrival=0;
   var minutesaway="";
   var trainAway;
   
   // Capture Button Click
 $(document).on("click","#add-train", function(event) {
    event.preventDefault();
    // debugger;
    // Grabbed values from text boxes
    trainname = $("#train-name").val().trim();
    console.log(trainname);
    desti = $("#train-dest").val().trim();
    console.log(desti);
    trainstart=moment($("#train-start").val(),"HH:mm").format("HH:mm");
    console.log(trainstart);
   frequency = $("#train-freq").val().trim();
   console.log(frequency);
   
   database.ref().push({
    Trainname: trainname,
    destination: desti,
    traintime: trainstart,
    frequency: frequency,
  });
  $("#train-name").val("");
  $("#train-dest").val("");
  $("#train-start").val("");
  $("#train-freq").val("");

  
});
// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    //logging it into Console.
      console.log(sv.Trainname);
      console.log(sv.destination);
      console.log(sv.traintime);
      console.log(sv.frequency);
      // populating the values from the database and string them in a variable.
     var trainname=sv.Trainname;
     var desti=sv.destination;
     var traintime=sv.traintime;
      var frequency=sv.frequency;
      
   
console.log("starttime:"+traintime);
// var startTime = sv.traintime;
// var startMinutes = parseInt(startTime.split(":")[1])
// var startHours = parseInt(startTime.split(":")[0])
// console.log(startTime)
// console.log(startMinutes)
// console.log(startHours)
// var totalStartMinutes = startHours * 60 + startMinutes;
// console.log(totalStartMinutes)
// var roundTime =sv.frequency;

// var currentTime =moment().format('hh:mm A')
// var currentMinutes = parseInt(currentTime.split(":")[1])
// var currentHours = parseInt(currentTime.split(":")[0])
// console.log(currentTime)
// console.log(currentMinutes)
// console.log(currentHours)
// var totalCurrentMinutes = currentMinutes *60 +currentHours ;
// console.log(totalCurrentMinutes)

// var totalDifference = totalCurrentMinutes - totalStartMinutes;
// console.log("Total Minutes" + totalDifference)

// var trainAway = (roundTime - totalDifference%roundTime)
// console.log(trainAway + " minutes away")

// var arrivalTimeMinutes = totalCurrentMinutes + trainAway
// console.log(arrivalTimeMinutes)
// var arrivalMinutePlace = arrivalTimeMinutes % 60
// console.log(arrivalMinutePlace)
// var arrivalHourPlace = (arrivalTimeMinutes - arrivalMinutePlace)/60
// console.log(arrivalHourPlace)
// var trainArrival=arrivalHourPlace + ":" + arrivalMinutePlace;
// // var train=moment(trainArrival, 'hh:mm').format('hh:mm A');
// console.log(arrivalHourPlace + ":" + arrivalMinutePlace);
// // console.log(train);
        //var nextArr;
        var minAway;
        // Chang year so first train comes before now
        var firstTrainNew = moment(sv.traintime, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % sv.frequency;
        // Minutes until next train
        var minAway = sv.frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("HH:mm A");



  


    $("table").append("<tr><td>" + trainname + "</td><td>" + desti +"</td><td>" +  frequency + "</td><td>" +nextTrain+ "</td><td>" + minAway + "</td><tr>");


    

});