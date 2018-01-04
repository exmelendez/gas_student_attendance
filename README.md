# Classroom Attendance
**Objective:** Create a way for students to check themselves in while saving name, date and time data to a Google Sheet.

**Try it out:** [https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec](https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec)

## Notes
Naturally, human error is a possibility, I needed to ensure there were methods to prevent students from checking-in more than once and to prevent from the default drop menu selecter being entered into the spreadsheet. The first *if statement* ensures that the selected option is not null or the default *-- select --* option.

The second *if statement* iterates through an array holding row locations of the name found on the spreadsheet and another array holding row locations of the current date found on the spreadsheet. It compares both to check if there's a match. A match would indicate that the individual was already checked in that day.

```javascript
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
  ```

On the front end, the individual will receive one of the following error messages...
    
![Image of error message](http://gdurl.com/cLor)

![Image of check-in duplicate error](http://gdurl.com/ombF)
