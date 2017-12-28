var ss = SpreadsheetApp.openById("1WCgggJcrpLfhtxrBjurWriF7Y5xrMVLXypvfNZfYoYk");
var students = ss.getSheetByName("students");
var allData = students.getRange(2, 1, students.getLastRow(), students.getLastColumn()).getValues();

Logger.log(saveDateToRow(nameRow("Eddie Murphy"),createTimeStamp()));

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

function getData(name) {
  var student = allData.filter(function (row) {
    return row[0] === name;
  })[0];
    
  return {
    name: student[0]
  }
}

//Checks row of student names to ensure name is present
function namePresent(name){
  
  for (var i = 1; i < allData.length; i++){
    if (allData[i][0] === name && name != ""){
      return true;
    }
  }
  return false;
}

//Uses name string to find row/location on Spreadsheet
function nameRow(name){
  var nameRow;
  
  for (var i = 0; i < allData.length; i++){
    if (allData[i][0] === name){
      nameRow = i;
    }
  }
    return nameRow;
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

function saveDateToRow(row, time){

  students.getRange(row + 2, 2).setValue(time);
}

function testMsg(){
  return "JavaScript Msg";
}

function testMsg2(input){
  String(input);
  return input;
}