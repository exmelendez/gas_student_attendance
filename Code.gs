var ss = SpreadsheetApp.openById("1WCgggJcrpLfhtxrBjurWriF7Y5xrMVLXypvfNZfYoYk");
var students = ss.getSheetByName("students");
var transactions = ss.getSheetByName("transactions");
var allData = students.getRange(2, 1, students.getLastRow(), students.getLastColumn()).getValues();
var transactionList = transactions.getRange(2, 1, transactions.getLastRow(), transactions.getLastColumn()).getValues();

function doGet() { 
  return HtmlService
  .createTemplateFromFile('index')
  .evaluate(); 
}

function getStudents() {
  return students.getRange(2, 1, students.getLastRow() - 1)
    .getValues()
    .reduce(function (a, b) { // flatten array
      return a.concat(b[0])
  }, []);
}

//Saves name + timestamp data to SS if they are not already checked in. If not a message is returned stating person already checked in.
function checkIn(name){
  var nameArray = nameRows(name);
  var date = currentDate();
  var dateArray = dateRows(date);
  
  if (name === "" || name === " -- select -- "){
    return "Not a valid selection";
  }
  
  if (nameArray.length > 0 && dateArray.length > 0){
    for (var i = 0; i < dateArray.length; i++){
      for (var j = 0; j < nameArray.length; j++){
        if (nameArray[j] === dateArray[i]){
          return name + " already checked in today.";
        }
      }
    }
  }
  
  addDataToSS(name);
  return name + " checked in at " + createTimeStamp("time");
  
}

//Adds a row w/ specified data to spreadsheet
function addDataToSS (name) {
  transactions.appendRow([name, currentDate(), createTimeStamp("time")]);
}

//returns current date formatted like Apr 15 2017
function currentDate(){
  var date = Date();
  return date.charAt(4) + date.charAt(5) + date.charAt(6) + " " + date.charAt(8) + date.charAt(9) + " " + date.charAt(11) + date.charAt(12) + date.charAt(13) + date.charAt(14);
}

//returns array of rows with matching specified date
function dateRows(date){
  var matchingDateRows = [];
  
  for (var i = 0; i < transactionList.length; i++){
    var strDate = String(transactionList[i][1]);
    if (strDate.substring(4, 15) === date){
      matchingDateRows.push(i);
    }
  } 
    return matchingDateRows;
}

//returns array of rows with matching names
function nameRows(name){
  var matchingNameRows = [];
  
  for (var i = 0; i < transactionList.length; i++){
    if (transactionList[i][0] === name){
      matchingNameRows.push(i);
    }
  }
    return matchingNameRows;
}

//returns a string of the full current date by default or can be filtered by string keyword for a specific part of the string date.
function createTimeStamp(input){
  var date = Date();
  
  switch (input) {
    case "dayName":
        return date.charAt(0) + date.charAt(1) + date.charAt(2);
    case "month":
        return date.charAt(4) + date.charAt(5) + date.charAt(6);
    case "dayNum":
        return date.charAt(8) + date.charAt(9);
    case "year":
        return date.charAt(11) + date.charAt(12) + date.charAt(13) + date.charAt(14);
    case "time":
        return date.charAt(16) + date.charAt(17) + date.charAt(18) + date.charAt(19) + date.charAt(20) + date.charAt(21) + date.charAt(22) + date.charAt(23);
    default: 
        return date;
  }
}

function removeRows(){
  transactions.deleteRows(2, transactions.getLastRow()-1);
}