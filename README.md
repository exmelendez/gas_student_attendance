# Classroom Attendance
**Objective:** Create a way for students to check themselves in while saving name, date and time data to a Google Sheet.

**Try it out:** [https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec](https://script.google.com/macros/s/AKfycbzAgy1WyRXrFauwN4l3RX1WMhQszR4yE30QLzuc-3El7SEnhvw/exec)
>Disclaimer: _Google account needed to view/access_

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
    
![Image of error message](http://gdurl.com/cLor)

![Image of check-in duplicate error](http://gdurl.com/ombF)


## The Inner Workings

**The dropdown menu:** All of the selections available are actually being pulled from the spreadsheet. ![Image of dropdown](http://gdurl.com/tAUR)

Clicking on the spreadsheet button will allow you to view the spreadsheet where the names are being hosted. This was important as students change with the semester or drop in and out of class. I wanted the dropdown menu to dynamically, and automatically, be generated from the spreadsheet.

![Spreadsheet Button](http://gdurl.com/oz36t)

![student list](http://gdurl.com/4u6l)


**Checking In:** The check in process is straight forward. A student will select their name from the dropdown menu then click on the *Check-In* button. Aftwards the student is presented with a confirmation and the time of their check-in.

![check-in verification](http://gdurl.com/OmD7)

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

##### Updates
**January 17th, 2018**: Removed text button for actual, plus added functionality to disable button when pressed until data is submitted and the dropdown refreshed.
