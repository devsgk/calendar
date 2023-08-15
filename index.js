const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
let day = today.getDay();
const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
const labelDay = document.querySelector('.day');
const labelDate = document.querySelector('.date');
const labelMonthYear = document.querySelector('.month-year');

// Functions
// Show calendar header (Day, Date, Month, Year)
const calendarHeader = function () {
  labelDay.textContent = dayNames[day];
  labelDate.textContent = date;
  labelMonthYear.textContent = `${monthNames[month]} ${year}`;
};
calendarHeader();

//----- Fill in the calendar cells ----------------------------
// 1) Check how many days in a month, then update "numDays"
let numDays;

const calcNumDays = function () {
  [1, 3, 5, 7, 8, 10, 12].includes(month + 1) && (numDays = 31);
  [4, 6, 9, 11].includes(month + 1) && (numDays = 30);
  [2].includes(month + 1) && (numDays = 28);
};

// 2) Calculate "adjNum" (number of empyt days of the starting week) using known "date" and "day"
const adjArray = [1, 2, 3, 4, 5, 6, 0];
let adjNum;
let newDate;

const fillCalendar = function () {
  adjNum = adjArray.at(day - (date % 7));
  calcNumDays();
  for (let i = 1; i <= numDays; i++) {
    document.querySelector(`.item-${i + adjNum}`).textContent = i;
  }
};
fillCalendar();

// 3) Check whether it's current month or not. If so, set today's date to red color
const checkRed = function () {
  if (
    labelMonthYear.textContent ===
    `${monthNames[today.getMonth()]} ${today.getFullYear()}`
  ) {
    document.querySelector(`.item-${adjNum + today.getDate()}`).style.color =
      'red';
  } else {
    document
      .querySelectorAll('.item')
      .forEach((item) => (item.style.color = 'black'));
  }
};
checkRed();

// 4) btnRight, btnLeft
const btnRight = document.querySelector('.btn--right');
const btnLeft = document.querySelector('.btn--left');

btnRight.addEventListener('click', function () {
  console.log('---BTN RIGHT-----------------------');
  day = (day + ((numDays - date) % 7) + 1) % 7;
  console.log(`Updated day: ${day} ${dayNames[day]}`);
  month = (month + 1) % 12;

  month === 0 && year++;
  console.log(`Updated month: ${month} ${monthNames[month]}`);
  calcNumDays();
  console.log(`numDays: ${numDays}`);
  date = 1;
  calendarHeader();

  // Delete all cells
  document
    .querySelectorAll('.item-date')
    .forEach((cell) => (cell.textContent = ''));

  // Fill in the calendar cells
  fillCalendar();

  // Color all cells black

  // Format calendar: Display date 1 unless it's current month
  if (
    labelMonthYear.textContent ===
    `${monthNames[today.getMonth()]} ${today.getFullYear()}`
  ) {
    date = today.getDate();
    calendarHeader();
  }
  checkRed();
});

btnLeft.addEventListener('click', function () {
  console.log('---BTN LEFT-----------------------');
  if (month - 1 === -1) month = 11;
  else month = (month - 1) % 12;

  // Check if year changed
  month === 11 && year--;

  // Update new month's numDays
  calcNumDays();

  // Use prev month's "adjNum" to find "day" of the current month's last day
  if (adjNum === 0) day = 6;
  else {
    day = adjNum - 1;
  }

  // Set "date" to current month's "numDays"
  date = numDays;
  console.log(`Cur date: ${date}`);
  console.log(`Cur day: ${day} ${dayNames[day]}`);
  console.log(`Cur numDays: ${numDays}`);
  console.log(`Prev adjNum: ${adjNum}`);

  calendarHeader();

  // Delete all cells
  document
    .querySelectorAll('.item-date')
    .forEach((cell) => (cell.textContent = ''));

  // Fill in the calendar cells
  fillCalendar();
  console.log(document.querySelector(`.item-${adjNum + 1}`));

  // Format calendar (ex. Aug.01.2023)
  date = 1;
  day = adjNum;
  if (
    labelMonthYear.textContent ===
    `${monthNames[today.getMonth()]} ${today.getFullYear()}`
  ) {
    date = today.getDate();
  }

  calendarHeader();
  checkRed();
});

// 5) Display clicked date
document
  .querySelector('.grid-container')
  .addEventListener('click', function (e) {
    if (e.target.classList.contains('item-date')) {
      const cell = e.target;
      date = +cell.textContent;
      ((adjNum + (date % 7)) % 7) - 1 === -1
        ? (day = 6)
        : (day = ((adjNum + (date % 7)) % 7) - 1);
      calendarHeader();
    }
  });

// 삽질
// btnLeft.addEventListener('click', function () {
//   console.log('---BTN LEFT---');
//   // Create new header and calendar cells
//   calcNumDays();
//   month--;
//   date = numDays;
//   day = numDays[adjNum - 1];

//   //   console.log('---BTN LEFT---');
//   //   console.log(`${month} // ${date} // ${day}`);

//   fillCalendar();
//   calendarHeader();

//   console.log(`Month: ${monthNames[month]} // Number of days: ${numDays}
//   ${month} / ${date} / ${day}`);

//   // Delete all cells
//   document
//     .querySelectorAll('.item-date')
//     .forEach((cell) => (cell.textContent = ''));

//   // Remove color red
//   document
//     .querySelectorAll('.item')
//     .forEach((item) => (item.style.color = 'black'));
// });

// 3) Color today with red when displayed month === today's month
