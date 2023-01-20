let buttons = document.querySelectorAll("#multiLevelDropdownButton");
let dropdowns = document.querySelectorAll("#dropdown");

for (let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener("click", () => {
        dropdowns[i].classList.toggle("hidden");
    })
}