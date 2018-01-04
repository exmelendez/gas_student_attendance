# Classroom Attendance
**Objective:** Create a way for students to check themselves in while saving name, date and time data to a Google Sheet.

**Try it out:** [https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec](https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec)

##Notes
Naturally, human error is a possibility, I needed to ensure there were methods to prevent students from checking-in more than once and to prevent from the default drop menu selecter from being entered into the spreadsheet.
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
