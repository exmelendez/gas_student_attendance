# Classroom Attendance
**Objective:** Develop self serve method for 5th grade students to log their attendance and their restroom usage during technology class.

**Try it out:** [https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec](https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec)
>Disclaimer: _Google account needed to view/access_

### Introduction
Upon first visiting the page, by default, the *Attendance* tab is selected. The site only allows students to log their attendance or log their restroom useage.

![Attendance Tab](https://gdurl.com/kSRuz)

**Restroom restriction**
Before they are able to log their restroom use, they must first be logged in. Attempting to log restroom usage without logging their attendance will present a message indicating the user is not logged in. The *nameSearchCurrentSize* method above is also used to check if they have already logged their attendance for the day and also checks to see if the restroom column on the spreadsheet is empty.

![Not logged in restroom error message](https://gdurl.com/6qKf)

```javascript
if (namePresent === -1) {
        return name + " has not been logged in.";
      } else if (transactions.getRange(namePresent + 2, 4).getValue() != ""){
        return name +" has already taken a restroom break today.";
      } else {
        transactions.getRange(namePresent + 2, 4).setValue(currentTime);
        return name + " logged for restroom at " + currentTime;
      }
```

### Error prevention + Duplicate check
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
    
![Image of error message](https://gdurl.com/Cdps)

![Image of check-in duplicate error](https://gdurl.com/QRPZ)


## The Inner Workings

**The dropdown menu:** All of the selections available are actually being pulled from the spreadsheet. ![Image of dropdown](https://gdurl.com/5Kqs)

Clicking on the spreadsheet button will allow you to view the spreadsheet where the names are being hosted. This was important as students change with the semester or drop in and out of class. I wanted the dropdown menu to dynamically, and automatically, be generated from the spreadsheet.

![Spreadsheet Button](http://gdurl.com/oz36t)

![student list](http://gdurl.com/4u6l)


**Checking In:** The check in process is straight forward. A student will select their name from the dropdown menu then click on the *Check-In* button. Aftwards the student is presented with a confirmation and the time of their check-in.

![check-in msg](https://gdurl.com/xKMx)

Clicking on the spreadsheet button will also allow you to view and confirm the entries. Choose the *transactions* tab to view the check-in entries.

![transactions tab](http://gdurl.com/yDkR)

![checked-in entries](http://gdurl.com/8ZDU)


## Resetting
For demonstration purposes I have created a function to reset and clear the spreadsheet. An individual can only be checked-in once a day which would have prevented others from using or viewing it in action. Clicking on the *reset* button will erase all rows from the spreadsheet and present you with a confirmation message.
```javascript
function removeRows(){
  transactions.deleteRows(2, transactions.getLastRow()-1);
}
```

![Reset button](http://gdurl.com/ZFRa)

![reset confirmation message](http://gdurl.com/JOMF)

![empty spreadsheet](http://gdurl.com/Ytz3z)






### Developer Notes
One of the issues I encountered was differences in date due to time zone formatting. To resolve this ensure that both the settings on your Google Sheet and on your Google Apps Script Project are set to your desired timezone.

**Google Sheet**

![Sheet Settings](http://gdurl.com/7oWj)


**Google Apps Script**

![GAS Settings](http://gdurl.com/iOVE)


#### UPDATES
**January 17th, 2018**: Removed text button for actual button, plus added functionality to disable button when pressed until data is submitted and the dropdown refreshed.
