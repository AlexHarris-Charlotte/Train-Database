// Take in data from the form when the user clicks the submit button
// Make sure we prevent the default action of the submit button
// Get firebase project config
// Send the value to Firebase Database 


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
const trainArrival = $("#train-time");
const trainFreq = $("#frequency");
var dataArray = [];


$("#sub-button").on("click", subButton);


// submit button callback
function subButton(event) {
    event.preventDefault();
    const name = trainId.val().trim();
    const destination = trainDest.val().trim();
    const trainTime = trainArrival.val().trim();
    const frequency = trainFreq.val().trim();
    // Need a way to make new objects or else
    // we just overwrite previous object
    database.ref("Train/" + name).set({
        trainName: name,
        trainDestination: destination,
        trainTime: trainTime,
        trainFrequency: frequency
    })
    trainId.val("");
    trainDest.val("");
    trainArrival.val("");
    trainFreq.val("");

    var trainsNode = firebase.database().ref("Train/" + name);
    trainsNode.on('value', function(snapshot) {
    let remoteData = snapshot.val();
    console.log(remoteData);
    let trainDisplay = remoteData.trainName;
    dataArray.push(trainDisplay);
    let destinationDisplay = remoteData.trainDestination;
    dataArray.push(destinationDisplay);
    let timeDisplay = remoteData.trainTime;
    dataArray.push(timeDisplay);
    let frequencyDisplay = remoteData.trainFrequency;
    dataArray.push(frequencyDisplay);
    var tableRow = $("<tr>");
    $("#train-display").append(tableRow);
    for(var i = 0; i < dataArray.length; i++) {
        let tableData = $("<td>");
        tableData.text(dataArray[i]);
        tableRow.append(tableData);
    }
    // push to array
    // use for loop to make dom elements and append

});


}

// var trainsNode = firebase.database().ref("Train");
// trainsNode.on('value', function(snapshot) {
//     let remoteData = snapshot.trainName.val();
//     console.log(remoteData);
//     let trainDisplay = remoteData.trainName;
//     dataArray.push(trainDisplay);
//     let destinationDisplay = remoteData.trainDestination;
//     dataArray.push(destinationDisplay);
//     let timeDisplay = remoteData.trainTime;
//     dataArray.push(timeDisplay);
//     let frequencyDisplay = remoteData.trainFrequency;
//     dataArray.push(frequencyDisplay);
//     var tableRow = $("<tr>");
//     $("#train-display").append(tableRow);
//     for(var i = 0; i < dataArray.length; i++) {
//         let tableData = $("<td>");
//         tableData.text(dataArray[i]);
//         tableRow.append(tableData);
//     }
//     // push to array
//     // use for loop to make dom elements and append

// });


