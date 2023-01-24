// set the background to blue for the page we are currently on
let currentUrl = window.location.href
let url = currentUrl.slice(currentUrl.indexOf("/") + 2);

let elem = document.querySelector(`a[href="${url.slice(url.indexOf("/"))}"]`); // targets the anchor tag based on our current url

elem.classList.add("bg-jetBlue");