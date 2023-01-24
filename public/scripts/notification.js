
const button = document.querySelector("#notification-button");

const menu = document.querySelector('.menu');

button.addEventListener('click', (e) => {
    // toggle menu if noti button is clicked
    e.preventDefault();  // it prevents the execution of the default of the element

    menu.classList.toggle("hidden");
    button.classList.toggle("text-jetBlue"); 
});

window.addEventListener("click", (e) => {
    // if you click anywhere on the screen it will close the menu
    if (e.target.id !== "notification-button" && !menu.classList.contains("hidden")) {
        menu.classList.toggle("hidden");
    }
})
