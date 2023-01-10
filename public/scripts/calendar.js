const date = new Date();
const monthDays = document.querySelector(".days");

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();



let dayArray = document.querySelectorAll(".days > div");
for (let day of dayArray) {
  day.addEventListener('click', () => {

    // for (let otherDay of dayArray) {
    //   if (otherDay != day) {
    //     let days = "";
    //     days = otherDay;
    //     monthDays.innerHTML = days;
    //   }
    // }

    popUpWin(day);

  });
}

function popUpWin(day) {
  const theDate = day.innerHTML;
  day.innerHTML = `
                  <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Password requirements:</h2>
                  <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
                      <li>
                          At least 10 characters (and up to 100 characters)
                      </li>
                      <li>
                          At least one lowercase character
                      </li>
                      <li>
                          Inclusion of at least one special character, e.g., ! @ # ?
                      </li>
                  </ul>   
                  `
}

