

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxgMsZPVLoCY6uWjKTRm7GHDvcwIeR0_Q",
    authDomain: "project-1-12032.firebaseapp.com",
    databaseURL: "https://project-1-12032.firebaseio.com",
    projectId: "project-1-12032",
    storageBucket: "project-1-12032.appspot.com",
    messagingSenderId: "679749397571"
  };
  firebase.initializeApp(config);



var database = firebase.database();

$(document).ready(function() {

	var frequency;
	var trainName;
	var firstTrain;
	var trainTime;
	var minutesAway;
	var destination;

	database.ref().on("child_added", function(snapshot) {

		var frequency = snapshot.val().frequency;
		var trainName = snapshot.val().name;
		var firstTrain = snapshot.val().first;
		var destination = snapshot.val().destination;

		var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(0, "years");

		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		var remainderTime = diffTime % frequency;
		console.log(remainderTime);

		var minutesNextTrain = frequency - remainderTime;
		console.log(minutesNextTrain);

		var nextArrival = moment().add(minutesNextTrain, "m").format("hh:mm");
		console.log(nextArrival);

		$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + " min" + "</td><td>" +
		nextArrival + "</td><td>" + minutesNextTrain + " min" + "</td></tr>");


	});


	$("#form-submit").on("click", function(event) {

		event.preventDefault(); 

		trainName = $("#train-name").val().trim();
		firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X"); //moment.js here
		destination = $("#destination").val().trim();
		frequency = parseInt($("#frequency").val().trim());

		database.ref().push({
			name: trainName,
			first: firstTrain,
			destination: destination,
			frequency: frequency
		});

		$("#train-name").val("");
		$("#first-train").val("");
		$("#destination").val("");
		$("#frequency").val("");

	});

});