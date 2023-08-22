const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
let day = today.getDay();
const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
// prettier-ignore
const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const labelDay = document.querySelector('.day');
const labelDate = document.querySelector('.date');
const labelMonthYear = document.querySelector('.month-year');

// Show calendar header (Day, Date, Month-Year)
const calendarHeader = function () {
  labelDay.textContent = dayNames[day];
  labelDate.textContent = date;
  labelMonthYear.textContent = `${monthNames[month]} ${year}`;
};
calendarHeader();

// Calculate how many days in a month, then update "numDays"
let numDays;
const calcNumDays = function () {
  [1, 3, 5, 7, 8, 10, 12].includes(month + 1) && (numDays = 31);
  [4, 6, 9, 11].includes(month + 1) && (numDays = 30);
  [2].includes(month + 1) && (numDays = 28);
};

// Calculate "adjNum" (number of empyt days of the starting week). Use "date" and "day".
const adjArray = [1, 2, 3, 4, 5, 6, 0];
let adjNum;
let newDate;

const fillCalendar = function () {
  adjNum = adjArray.at(day - (date % 7));
  calcNumDays();
  document
    .querySelectorAll('.item-date')
    .forEach((cell) => (cell.textContent = ''));
  for (let i = 1; i <= numDays; i++) {
    document.querySelector(`.item-${i + adjNum}`).textContent = i;
  }
};
fillCalendar();

// Check if it's the current month
// YES: red "today" and display current month, date, and day.
// NO: black all and display date = 1
const checkCurMonth = function () {
  if (
    labelMonthYear.textContent ===
    `${monthNames[today.getMonth()]} ${today.getFullYear()}`
  ) {
    document.querySelector(`.item-${adjNum + today.getDate()}`).style.color =
      'red';
    date = today.getDate();
    calendarHeader();
  } else {
    document
      .querySelectorAll('.item')
      .forEach((item) => (item.style.color = 'black'));
    date = 1;
    calendarHeader();
  }
};
checkCurMonth();

// btnRight, btnLeft
const btnRight = document.querySelector('.btn--right');
const btnLeft = document.querySelector('.btn--left');

btnRight.addEventListener('click', function () {
  // Get FIRST "day" and "date" of the new month
  // Calculate day: new day = prev month's "adjNum" + numDaysMod7
  day = (adjNum + (numDays % 7)) % 7;
  // // Update date (FIRST date)
  date = 1;

  // Increase month
  month = (month + 1) % 12;
  // Increase year
  if (month === 0) year++;
  // Update numDays
  calcNumDays();
  // //Update header
  calendarHeader();
  console.log(`New Month: ${monthNames[month]}/${date}/${dayNames[day]}`);

  //Update calendar cells
  fillCalendar();

  // Check if it's the current month
  checkCurMonth();
});

btnLeft.addEventListener('click', function () {
  // Get LAST "day" and "date" of the new month
  // Calcualte day: Use prev month's "adjNum" to find new month's LAST "day"
  if (adjNum === 0) day = 6;
  else {
    day = adjNum - 1;
  }

  // Decrease month
  if (month - 1 === -1) month = 11;
  else month--;
  // Decrease year
  if (month === 11) year--;
  // Update numDays
  calcNumDays();
  // Update date (LAST date)
  date = numDays;
  // Update header
  calendarHeader();
  console.log(`New Month: ${monthNames[month]}/${date}/${dayNames[day]}`);

  //Update calendar cells
  fillCalendar();

  // Check if it's the current month
  checkCurMonth();
});

// Last: Display clicked date
document
  .querySelector('.grid-container')
  .addEventListener('click', function (e) {
    if (e.target.classList.contains('item-date')) {
      const cell = e.target;
      date = +cell.textContent;
      const dateMod7 = date % 7;
      const dayMod7 = ((adjNum + dateMod7) % 7) - 1;

      if (dayMod7 === -1) day = 6;
      else day = dayMod7;

      calendarHeader();
    }
  });
