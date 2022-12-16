let button = document.querySelector("#notification-button");

const menu = document.querySelector('.menu');

button.addEventListener('click', (e) => {
    e.preventDefault();

    menu.classList.toggle("hidden");
    button.classList.toggle("text-jetBlue");

   
});

window.addEventListener("click", (e) => {
    if (e.target.id !== "notification-button" && !menu.classList.contains("hidden")) {
        menu.classList.toggle("hidden");

    }
})
