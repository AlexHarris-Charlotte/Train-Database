

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
var dataArray = [];


$("#sub-button").on("click", subButton);

const nowMin = parseInt(moment().format("mm"));
const nowHour = parseInt(moment().format("HH") * 60);
const currTimeMin = nowHour + nowMin;
console.log(currTimeMin);



// submit button callback
function subButton(event) {
    event.preventDefault();
    const name = trainId.val().trim();
    const destination = trainDest.val().trim();
    const trainFirstTime = firstArrival.val().trim();
    const frequency = parseInt(trainFreq.val().trim());

    // Converts the First Arrival time to total Minutes
    const trainFirstHour = parseInt(trainFirstTime.substring(0, 2) * 60);
    const trainFirstMin = parseInt(trainFirstTime.substring(3))
    const trainFirstTotalMin = trainFirstHour + trainFirstMin;
    
    const minutesDiff = currTimeMin - trainFirstTotalMin;
    console.log(minutesDiff);
    const minRemainder = minutesDiff % frequency;
    let minutesAway = frequency - minRemainder;
    
    /*To get the next Arrival We need to calculate the difference between
    current time and first arrival time. We convert the difference into minutes.
    Assign a variable (remainder) to the difference % frequency. next Arrival
    in minutes is equal to freq - remainder*/




    database.ref("Train/" + name).set({
        trainName: name,
        trainDestination: destination,
        trainFirstTime: trainFirstTime,
        trainFrequency: frequency
    })
    trainId.val("");
    trainDest.val("");
    firstArrival.val("");
    trainFreq.val("");

    var trainsNode = firebase.database().ref("Train/" + name);
    trainsNode.on('value', function(snapshot) {
    let remoteData = snapshot.val();
    let trainDisplay = remoteData.trainName;
    dataArray.push(trainDisplay);
    let destinationDisplay = remoteData.trainDestination;
    dataArray.push(destinationDisplay);
    let frequencyDisplay = remoteData.trainFrequency;
    dataArray.push(frequencyDisplay);
    let nextArrival = minutesAway + currTimeMin;
    let nextArrivalHours = ((nextArrival - (nextArrival % 60)) / 60) + ":" + (nextArrival % 60).toString();
    dataArray.push(nextArrivalHours);
    dataArray.push(minutesAway);
    var tableRow = $("<tr>");
    $("#train-display").append(tableRow);
    for(var i = 0; i < dataArray.length; i++) {
        let tableData = $("<td>");
        tableData.text(dataArray[i]);
        tableRow.append(tableData);
    }
    

});


}



