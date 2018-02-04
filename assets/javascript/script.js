

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

// const nowMin = parseInt(moment().format("mm"));
// const nowHour = parseInt(moment().format("HH") * 60);
// const currTimeMin = nowHour + nowMin;
// console.log(currTimeMin);



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
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainDemo = moment(nextTrain).format("hh:mm");


    database.ref().push({
        trainName: name,
        trainDestination: destination,
        trainFirstTime: trainFirstTime,
        trainFrequency: frequency,
        nextArrival: nextTrainDemo,
        minutesAway: tMinutesTillTrain

    })

    trainId.val("");
    trainDest.val("");
    firstArrival.val("");
    trainFreq.val("");

}

database.ref().on("child_added", function(childSnapshot) {
    var remoteData = childSnapshot.val();
    console.log(remoteData);
    
    $("#train-display").append("<tr> <td> " + remoteData.trainName +
        "</td> <td> " + remoteData.trainDestination + "</td> <td> " + 
        remoteData.trainFrequency + "</td> <td>" + remoteData.nextArrival + "</td>" +
        "<td> " + remoteData.minutesAway + "</td> </tr>");

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});



