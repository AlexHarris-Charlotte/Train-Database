

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAMfbtQS7BqkT6AIqtZ8BYX9yaR0X4uuc",
    authDomain: "train-database-27f53.firebaseapp.com",
    databaseURL: "https://train-database-27f53.firebaseio.com",
    projectId: "train-database-27f53",
    storageBucket: "train-database-27f53.appspot.com",
    messagingSenderId: "170116973343"
  };
firebase.initializeApp(config);

const database = firebase.database();
const trainId = $("#train-name");
const trainDest = $("#destination");
const firstArrival = $("#train-time");
const trainFreq = $("#frequency");


$("#sub-button").on("click", subButton);




// submit button callback
function subButton(event) {
    event.preventDefault();
    const name = trainId.val().trim();
    const destination = trainDest.val().trim();
    const trainFirstTime = firstArrival.val().trim();
    const frequency = parseInt(trainFreq.val().trim());

    // Time Conversions with Moment.js
    var currentTime = moment();
    var firstTimeConverted = moment(trainFirstTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Diff time in callback: " + diffTime);
    var tRemainder = diffTime % frequency;
    console.log("tRemainder in callback: " + tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainDemo = moment(nextTrain).format("hh:mm");

    // Store form data to database
    database.ref().push({
        trainName: name,
        trainDestination: destination,
        trainFirstTime: trainFirstTime,
        trainFrequency: frequency,
    })
    
    // Remove input Values
    trainId.val("");
    trainDest.val("");
    firstArrival.val("");
    trainFreq.val("");

}

    // need to add time conversion to below function to show minutes away

database.ref().on("child_added", function(childSnapshot) {
    var remoteData = childSnapshot.val();
    console.log(remoteData);
    
    let currentTime = moment();
    let firstTimeConverted = moment(remoteData.trainFirstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);
    let tRemainder = diffTime % remoteData.trainFrequency;
    console.log(tRemainder);
    let tMinutesTillTrain = remoteData.trainFrequency - tRemainder;
    let demoVar = moment().add(tMinutesTillTrain, "minutes");
    let nextTrain = moment(demoVar).format("hh:mm");
    let minutesAway = demoVar - currentTime;
    let minutesAwayConverted = moment(minutesAway).format("mm");



    $("#train-display").append("<tr> <td> " + remoteData.trainName +
        "</td> <td> " + remoteData.trainDestination + "</td> <td> " + 
        remoteData.trainFrequency + "</td> <td>" + nextTrain + "</td>" +
        "<td> " + minutesAwayConverted + "</td> </tr>");

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});



