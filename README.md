# Classroom Attendance: Usage + Understanding

### Objective:
Develop self serve method for 5th grade students to log their attendance and their restroom usage during technology class.

**Try it out:** [https://goo.gl/c4FwMu](https://goo.gl/c4FwMu)
>Disclaimer: _Google account needed to view/access_

### Introduction
Upon first visiting the page, by default, the *Attendance* tab is selected. 
```html
<button class="tablinks" onclick="openEvent(event, 'Attendance')" id="defaultOpen">Attendance</button>
```
```javascript
document.getElementById("defaultOpen").click();
```

![Attendance Tab](https://gdurl.com/kSRuz)

The site only allows students to log their attendance or log their restroom useage. Logging attendance is straight forward and simple. While on the attendance tab, the student must choose their name from the dropdown menu.

![choose name for attendance log](https://gdurl.com/ZNB7)

**The dropdown menu**

The dropdown menu is being created programmatically from the Google Spreadsheet associated with it. This allows an administrator or a teacher to update the student list easily from the document.

![student list](http://gdurl.com/4u6l)

*JavaScript:*
```javascript
function getStudents() {
  var students = ss.getSheetByName("students");
  
  return students.getRange(2, 1, students.getLastRow() - 1)
    .getValues()
    .reduce(function (a, b) { // flatten array
      return a.concat(b[0])
  }, []);
}
```

*HTML:*
```html
<select id="attendanceSelect">
      <option disabled selected value> -- select -- </option>
      <? var options = getStudents()
        for (var i = 0; i < options.length; i++) { ?>
          <option><?= options[i] ?></option>
       <? } ?>
      </select>
```
After choosing their name and clicking the button, they are given a success message with their time of attendance log.

![check-in msg](https://gdurl.com/xKMx)


**Logging restroom usage**

Once a student has logged their attendance in, they are able to log themselves for the restroom should they need to use it. Clicking on the *Restroom* tab presents a drop down identical to the one found in the *Attendance* tab. It also uses the same *getStudents* method to create the dropdown.

![Restroom log tab](https://gdurl.com/Hv63)

# Classroom Attendance: Errors + Checks

### Duplicate Log Prevention
The web app is only designed for a single period class which takes place once a day; because of this I have designed it to only allow one log per day, per task (i.e. Attendance or Restroom). I wrote a function titled *nameSearchCurrentSize* which takes in two parameters, a *name* and a *search* type. Inside of this function is a switch statement filtered by a *search* type of *search* or *total count*. Total count will return the number of currently logged students for the day, I'll explain that further later on. The switch case I want to bring attention to is *search*, this one iterates through the entire spreadsheet checking for the current date and the name given in the parameter field. If found, it will return the index of it's location, otherwise it will return a *-1*.

```javascript
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
```
When the name is found, the initial function ( called *checkIn()* ) will either return a message indicating the student has already been logged or will add the information to the spreadsheet as a new row.

```javascript
if (namePresent > -1){
        return name + " already logged for today.";
} else {
        addDataToSS(name);
        return name + " checked in at " + currentTime + ".";
}
```

![Log Success or Dup Msg](https://gdurl.com/tLaj)

#### Duplicate Restroom Log Prevention
The restroom section is also designed not to allow duplicate restroom logs.

The *nameSearchCurrentSize* method mentioned above is used to check if they have already logged their attendance for the day while the *if* statement checks to see if the restroom column on the spreadsheet is empty.


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

Before they are able to log their restroom use, the student must first be logged in. Attempting to log restroom usage without logging their attendance will present a message indicating the user is not logged in.

![Not logged in restroom error message](https://gdurl.com/6qKf)



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

# Classroom Attendance: Extras

Clicking on the spreadsheet button will allow you to view the spreadsheet where the names are being hosted. This was important as students change with the semester or drop in and out of class. I wanted the dropdown menu to dynamically, and automatically, be generated from the spreadsheet.

![Spreadsheet Button](http://gdurl.com/oz36t)

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


### UPDATES
**January 17th, 2018**: Removed text button for actual button, plus added functionality to disable button when pressed until data is submitted and the dropdown refreshed.
