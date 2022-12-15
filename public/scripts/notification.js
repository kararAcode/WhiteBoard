let button = document.querySelector("#notification-button");

const anchors = document.querySelector('.menu');

button.addEventListener('click', e => {
    e.preventDefault();

    anchors.classList.toggle("hidden");
})