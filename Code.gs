function doGet() {
  return HtmlService.createHtmlOutputFromFile("index2");
}

function doSomething(form){
var SpreadSheetKey = "1mHmyBz2tV481L8zvYG3jRwTMo4r6A7HPzrCAhLrZ5A8";
  
  var sheet = SpreadsheetApp.openById(SpreadSheetKey).getActiveSheet();
  textBoxValue = form.textBoxName;
  var lastRow = sheet.getLastRow();
  
  sheet.getRange(lastRow+1, 1, 1, 1).setValues([[textBoxValue]]);
}

function doSomething2(form){
var SpreadSheetKey = "1mHmyBz2tV481L8zvYG3jRwTMo4r6A7HPzrCAhLrZ5A8";
  
  var sheet = SpreadsheetApp.openById(SpreadSheetKey).getActiveSheet();
  scoreOnetextBox = form.scoreOneBox;
  scoreTwotextBox = form.scoreTwoBox;
  scoreThreetextBox = form.scoreThreeBox;
  var lastRow = sheet.getLastRow();
  
  sheet.getRange(lastRow+1, 1).setValue([[scoreOnetextBox]]);
  sheet.getRange(lastRow+1, 2).setValue([[scoreTwotextBox]]);
  sheet.getRange(lastRow+1, 3).setValue([[scoreThreetextBox]]);
}