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

const displayHeader = function () {
  labelDay.textContent = dayNames[day];
  labelDate.textContent = date;
  labelMonthYear.textContent = `${monthNames[month]} ${year}`;
};
displayHeader();

let numberOfDays;
const calculateNumberOfDays = function () {
  [1, 3, 5, 7, 8, 10, 12].includes(month + 1) && (numberOfDays = 31);
  [4, 6, 9, 11].includes(month + 1) && (numberOfDays = 30);
  [2].includes(month + 1) && (numberOfDays = 28);
};

const emptyDaysArray = [1, 2, 3, 4, 5, 6, 0];
let numberOfEmptyDays;

const fillCalendar = function () {
  numberOfEmptyDays = emptyDaysArray.at(day - (date % 7));
  calculateNumberOfDays();
  document
    .querySelectorAll('.item-date')
    .forEach((cell) => (cell.textContent = ''));
  for (let i = 1; i <= numberOfDays; i++) {
    document.querySelector(`.item-${i + numberOfEmptyDays}`).textContent = i;
  }
};
fillCalendar();

const checkCurrentMonth = function () {
  if (
    labelMonthYear.textContent ===
    `${monthNames[today.getMonth()]} ${today.getFullYear()}`
  ) {
    document.querySelector(
      `.item-${numberOfEmptyDays + today.getDate()}`
    ).style.color = 'red';
    date = today.getDate();
    displayHeader();
  } else {
    document
      .querySelectorAll('.item')
      .forEach((item) => (item.style.color = 'black'));
    date = 1;
    displayHeader();
  }
};
checkCurrentMonth();

const buttonRight = document.querySelector('.button--right');
const buttonLeft = document.querySelector('.button--left');

buttonRight.addEventListener('click', function () {
  day = (numberOfEmptyDays + (numberOfDays % 7)) % 7;

  date = 1;

  month = (month + 1) % 12;

  if (month === 0) year++;

  calculateNumberOfDays();

  displayHeader();

  fillCalendar();

  checkCurrentMonth();
});

buttonLeft.addEventListener('click', function () {
  if (numberOfEmptyDays === 0) {
    day = 6;
  } else {
    day = numberOfEmptyDays - 1;
  }

  if (month - 1 === -1) {
    month = 11;
  } else month--;

  if (month === 11) year--;

  calculateNumberOfDays();
  date = numberOfDays;
  displayHeader();

  fillCalendar();

  checkCurrentMonth();
});

document
  .querySelector('.grid-container')
  .addEventListener('click', function (event) {
    if (event.target.classList.contains('item-date')) {
      const cell = event.target;
      date = +cell.textContent;
      const dateMod7 = date % 7;
      const dayMod7 = ((numberOfEmptyDays + dateMod7) % 7) - 1;

      if (dayMod7 === -1) {
        day = 6;
      } else day = dayMod7;

      displayHeader();
    }
  });
