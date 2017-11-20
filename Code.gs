var ss = SpreadsheetApp.openById("1WCgggJcrpLfhtxrBjurWriF7Y5xrMVLXypvfNZfYoYk");
//var ss = SpreadsheetApp.getActiveSpreadsheet();
var students = ss.getSheetByName("students");

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