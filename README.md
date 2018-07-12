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
The web app is only designed for a single period class which takes place once a day; because of this I have designed it to only allow one log per day, per task (i.e. Attendance or Restroom). I wrote a function titled *nameSearchCurrentSize* which takes in two parameters, a *name* and a *search* type. Inside of this function is a switch statement filtered by a *search* type of *search* or *totalCount*. Total count will return the number of currently logged students for the day, I'll explain that further later on. The switch case I want to bring attention to is *search*, this one iterates through the entire spreadsheet checking for the current date and the name given in the parameter field. If found, it will return the index of it's location, otherwise it will return a *-1*.

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

### Null Check
Naturally, human error is a possibility; early on I realized the students could possibly submit the default *-- select --* (or *null*) as an option, making the spreadsheet data invalid. The simple *if* statement below fixes that.

```javascript
if (name === "" || name === " -- select -- "){
    return "Not a valid selection";
}
```
On the front end, the individual will receive the error message below...
    
![Image of error message](https://gdurl.com/Cdps)

### Single Submission
Depending on the state of the connected Network, the speed time of submission and receiving a result message may vary by a few seconds. Initially I found multiple student entries as the students were clicking the *log* button multiple times since an instant result was not occuring. To combat and prevent this, I implemented code that disables the button until completion.

```html
document.getElementById("attendanceBtn").disabled = true;
```

![Submit button progress](https://gdurl.com/c-Qy)

# Classroom Attendance: Extras

### Status Message Delete
The status message received on either the *Attendance* or *Restroom* tab lets the user know if an action was successful. On the backend the actions are processed by the *checkIn* function which in return provides a String to a frontend *Div*.

```javascript
var div = document.getElementById("student_status");
div.innerHTML = statusMsg;
```

Providing a status message is useful, but I found that navigating to another tab and returning to the tab again would present the last message previously given. My first initial solution was to have timed messages that disappear after a certain duration, but I found that not all HTML/CSS functions operate normally on *Google Apps Script*. The backup solution was to make the app seem more dynamic by removing the message when a user switches to another tab.

Inside of the function that allows a user to switch tabs I added an *if* statement that will remove the messages from other tabs.

```javascript
if (action === "Attendance"){
  var div = document.getElementById("restroom_status");
  div.innerHTML = "";
} else {
  var div = document.getElementById("student_status");
  div.innerHTML = "";
}
```

### Student Counter
The web app assists in keeping a record of students attendance and their restroom useage. This is great to look back at and use as a reference. However, there was one scenario that I felt needed to be accessible immediately and that is safety. In the event that a class needs to evacuate immediately due to a fire, or any another number of reasons, a teacher still needs to be held accountable to their students. I implemented a simple student counter/tracker to let the staff member (or instructor) know how many students should currently be present. This counter can be found at the bottom left corner of the page/app.

![Student Counter/Tracker](https://gdurl.com/XUMS)

I previously mentioned that the *nameSearchCurrentSize* function has a switch statement with a *totalCount* filter/parameter. Inside of this switch is a forloop that iterates through the entire spreadsheet looking for entries of the current day. Since every student can only have one date entry per day, it will return the total count integer of the number of students logged for the day.

```javascript
var numOfDateMatch = 0;
      
for (var i = 0; i < transactionList.length; i++){
  var strDate = String(transactionList[i][1]);
  if (strDate.substring(4, 15) === date){
    numOfDateMatch++;
  }
} 
  return numOfDateMatch;
```

**FYI**: I designed the *nameSearchCurrentSize()* function to have multiple uses to prevent creating more than one 2D array of the the spreadsheet and it's data entirety. My idea is to minimize the potentially high volume and load time of data being called.

# Testing

This project was developed to be used in a world environment at a school in the South Bronx. For the purposes of safety and confidentiality I have created this version as my testing and "next phase" development module before deploying live. On the bottom of the page you will find a button that allows you to view the spreadsheet and see the live data be added or removed as you manipulate it on the front end.

![Spreadsheet Button](http://gdurl.com/oz36t)

On the spreadsheet feel free to Choose the *transactions* tab to view the check-in entries.

![transactions tab](http://gdurl.com/yDkR)

![checked-in entries](http://gdurl.com/8ZDU)

### Resetting
An individual can only be checked-in once a day, this prevents you the user from using or viewing it in action if all the students are aleady checked in/logged. Clicking on the *reset* button at the bottom of the page will delete all rows from the spreadsheet, present you with a confirmation message and ultimately allow you to use the app.

![reset confirmation message](http://gdurl.com/JOMF)

![Reset button](http://gdurl.com/ZFRa)

```javascript
function removeRows(){
  transactions.deleteRows(2, transactions.getLastRow()-1);
}
```
# Developer Notes
One of the issues I encountered was differences in date due to time zone formatting. To resolve this ensure that both the settings on your Google Sheet and on your Google Apps Script Project are set to your desired timezone.

**Google Sheet**

![Sheet Settings](http://gdurl.com/7oWj)


**Google Apps Script**

![GAS Settings](http://gdurl.com/iOVE)


### UPDATES
**January 17th, 2018**: Removed text button for actual button, plus added functionality to disable button when pressed until data is submitted and the dropdown refreshed.

**July 6th, 2018**: Complete redesign, code clean and added/modified functionality. . .
* Integrated Restroom category HTML/CSS
* Modified Attendance category HTML/CSS to have more specific names and forms to diferentiate from Restroom category
* Modified *checkIn* function to have a switch statement that will sort the log type (i.e. Attendance/Restroom)
* Integrated JS & HTML that will count current logged students and present it's return int on the frontend
* Moved SS 2D array variable to a new *nameSearchCurrentSize()* function as it was only being called twice and I found no need to call it upon creation. This may cause further load time
* Removed *currentDate* function and joined that functionality as another switch case in the function that was already handling a lot of the date functions
* Wrote HTML to remove last status when switching between category tabs
