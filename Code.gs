var ss = SpreadsheetApp.openById("1WCgggJcrpLfhtxrBjurWriF7Y5xrMVLXypvfNZfYoYk");
//var ss = SpreadsheetApp.getActiveSpreadsheet();
var students = ss.getSheetByName("students");

function doGet() { 
  return HtmlService
  .createTemplateFromFile('index')
  .evaluate(); 
}