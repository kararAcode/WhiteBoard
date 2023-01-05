let currentUrl = window.location.href
let url = currentUrl.slice(currentUrl.indexOf("/") + 2);

let elem = document.querySelector(`a[href="${url.slice(url.indexOf("/"))}"]`);

elem.classList.add("bg-jetBlue")