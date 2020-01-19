var firebaseConfig = {
    apiKey: "AIzaSyBNhc1zvBUy8PviSvEwg0gLmbMytj8XPu0",
    authDomain: "train-scheduler-29d03.firebaseapp.com",
    databaseURL: "https://train-scheduler-29d03.firebaseio.com",
    projectId: "train-scheduler-29d03",
    storageBucket: "train-scheduler-29d03.appspot.com",
    messagingSenderId: "236516982321",
    appId: "1:236516982321:web:355cd8d8c9baadff9b5f10"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Assigns user inputs to variables
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Object for holding train info
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Uploads train info to database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.trainDestination);
    console.log(newTrain.trainTime);
    console.log(newTrain.trainFrequency);

    // Alerts when train has been added
    alert("Train successfully added");

    // Clears the input boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// Creates Firebase event for adding train to the database
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Stores info in variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // Logs everything to console
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minutes Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    minAway = tMinutesTillTrain;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + nextTrain.format("hh:mm a"));
    nextArrival = moment(nextTrain).format("hh:mm a");

    // Creates the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway),
    );

    // Appends the new row to the table
    $("#train-table > tbody").append(newRow);

    // Auto updates "minutes to arrival" and "next train time" every minute
    setInterval(function () {
        window.location.reload();
    }, 60000);

});
