var ss = SpreadsheetApp.openById("1WCgggJcrpLfhtxrBjurWriF7Y5xrMVLXypvfNZfYoYk");
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

function getData(name) {
  var allData = students.getRange(2, 1, students.getLastRow(), students.getLastColumn()).getValues();
  var student = allData.filter(function (row) {
    return row[0] === name;
  })[0];
    
  return {
    name: student[0]
  }
}