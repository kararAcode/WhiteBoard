const date = new Date();

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
    popUpWin(day);
  });
}

function popUpWin(day) {
  const theDate = day.innerHTML;
  day.innerHTML = `<div class="space-x-6">
                   <div class="menu hidden absolute right-0 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                       <div class="py-1" role="none">
                           <a href="#" class="text-red-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Edit</a>
                           <a href="#" class="text-red-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Duplicate</a>
                       </div>
                       <div class="py-1" role="none">
                           <a href="#" class="text-red-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Archive</a>
                           <a href="#" class="text-red-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Move</a>
                       </div>
                       <div class="py-1" role="none">
                           <a href="#" class="text-red-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Share</a>
                           <a href="#" class="text-red-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-5">Add to favorites</a>
                       </div>
                       <div class="py-1" role="none">
                           <a href="#" class="text-red-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-6">Delete</a>
                       </div>
                   </div>
                   </div>`
}