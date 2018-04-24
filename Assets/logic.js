  var config = {
    apiKey: "AIzaSyAhOQpEtIZRynzkXGzvWCRm-qVxqx4ApEs",
    authDomain: "train-schedule-729f6.firebaseapp.com",
    databaseURL: "https://train-schedule-729f6.firebaseio.com",
    projectId: "train-schedule-729f6",
    storageBucket: "train-schedule-729f6.appspot.com",
    messagingSenderId: "625709841180"
  };
  firebase.initializeApp(config);


var database = firebase.database();
  


var trainName = "";
var trainDest = "";
var firstTrain = "";
var trainFreq = "";


$("#submitTrain").on("click", function (){

  event.preventDefault();


  trainName = $("#name").val().trim();
  trainDest = $("#dest").val().trim();
  firstTrain = $("#time").val().trim();
  trainFreq = $("#frq").val().trim();


  var rootRef = database.ref("All-Trains");
  



  rootRef.push({
    

trainName: trainName,
trainDest: trainDest,
firstTrain: firstTrain,
trainFreq: trainFreq


});
  




});








 var dbRef = firebase.database().ref().child("All-Trains");
 var allTrain = "All-Trains"



dbRef.on('value', function(snapshot){
  $(".appendrows").empty();


dbRef.once("value", function(snapshot){
  snapshot.forEach(function(child){
    console.log("     Train's Departing")
    console.log("Train Name: " +child.val().trainName);
    console.log("Train Destination: " +child.val().trainDest);
    console.log("Train Departure: " +child.val().firstTrain);
    console.log("Train Frequency: " +child.val().trainFreq);
  })
})




  snapshot.forEach(function(childSnapshot){

    var childData = childSnapshot.val();
    var addRow = '<tr class = "appendrows">' + 
                    '<td>' + childData.trainName + '</td>' +
                    '<td>' + childData.trainDest + '</td>' +
                    '<td>' + childData.firstTrain + '</td>' +
                    '<td>' + childData.trainFreq + '</td>' +
                    '<td>' + childData.tMinutesTillTrain + '</td>' +

                  '</tr>';

        $(".schedBody").append(addRow)
    });
  }, function (error){
    console.log("Error: " + error.code);
  })
  dbRef.on('child_added', function(childSnapshot) {
  // find when the next train is and minutes until next train
  var tfrequency = childSnapshot.val().trainFreq;
  // pushed back 1 year to make sure it comes before current time
  var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
  var trainTime = moment(convertedDate).format('HH:mm');
  var currentTime = moment();
  // pushed back 1 year to make sure it comes before current time
  var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tfrequency;
  //solved
  var tMinutesTillTrain = tfrequency - tRemainder;
  //solved
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm')
 
});
  setInterval(function(){
    location.reload();
  }, 50000)

 /*var dataChange = firebase.database().ref('All-Trains');
dataChange.on('value', function(snapshot) {
  updateDataChange('<td>', snapshot.val().trainName, snapshot.val().trainDest, snapshot.val().firstTrain, snapshot.val().trainFreq);
});
*/
    