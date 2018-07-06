var ss = SpreadsheetApp.openById("1WCgggJcrpLfhtxrBjurWriF7Y5xrMVLXypvfNZfYoYk");
var transactions = ss.getSheetByName("transactions");

function doGet() { 
  return HtmlService
  .createTemplateFromFile('index')
  .evaluate(); 
}

function getStudents() {
  var students = ss.getSheetByName("students");
  
  return students.getRange(2, 1, students.getLastRow() - 1)
    .getValues()
    .reduce(function (a, b) { // flatten array
      return a.concat(b[0])
  }, []);
}

function checkIn(name, type){
  
  if (name === "" || name === " -- select -- "){
    return "Not a valid selection";
  }
  
  var namePresent = nameSearchCurrentSize(name, "search");
  var currentTime = currentDate("time");
  
  switch (type) {
    case "attendance":

      if (namePresent > -1){
        return name + " already logged for today.";
      } else {
        addDataToSS(name);
        return name + " checked in at " + currentTime + ".";
      }
      
    case "restroom":
      
      if (namePresent === -1) {
        return name + " has not been logged in.";
      } else if (transactions.getRange(namePresent + 2, 4).getValue() != ""){
        return name +" has already taken a restroom break today.";
      } else {
        transactions.getRange(namePresent + 2, 4).setValue(currentTime);
        return name + " logged for restroom at " + currentTime;
      }
  } 
}

/* Returns either the number of logs for the current day or the index location of a name based on the String/Filter parameter given.
For name search, -1 is returned if no match is found */
function nameSearchCurrentSize(name, searchType){
  var transactionList = transactions.getRange(2, 1, transactions.getLastRow(), transactions.getLastColumn()).getValues();
  var date = currentDate("fullDate");

  switch (searchType) {
    case "search":

      var matchingIndex = -1;
      
      /* Date/Name search */
      for (var i = 0; i < transactionList.length; i++){
        var logDate = String(transactionList[i][1]).substring(4, 15);
        var logName = String(transactionList[i][0]);
    
        if (logDate === date && logName === name){
          matchingIndex = i;
        }
      }
  
      return matchingIndex;

    case "totalCount":
      
      var numOfDateMatch = 0;
      
      for (var i = 0; i < transactionList.length; i++){
        var strDate = String(transactionList[i][1]);
        if (strDate.substring(4, 15) === date){
          numOfDateMatch++;
        }
      } 
      return numOfDateMatch;
  }
}

//Adds a new row to SS with the given parameter name along with the current date & time on ajoining columns
function addDataToSS (name) {
  transactions.appendRow([name, currentDate("fullDate"), currentDate("time")]);
}

//returns a string of the full current date by default or can be filtered by String keyword for a specific section.
function currentDate(input){
  var date = Date();
  
  switch (input) {
    case "fullDate":
        return date.charAt(4) + date.charAt(5) + date.charAt(6) + " " + date.charAt(8) + 
          date.charAt(9) + " " + date.charAt(11) + date.charAt(12) + date.charAt(13) + date.charAt(14);
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

//Deletes all rows from log spreadsheet
function removeRows(){
  transactions.deleteRows(2, transactions.getLastRow()-1);
}