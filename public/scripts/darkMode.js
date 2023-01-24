//in this version of the project we currently don't have a dark mode btn
let darkModeBtn = document.querySelector("#darkModeBtn"); 

darkModeBtn.addEventListener("keypress", (e) => {
    // switches the icon
    darkModeBtn.classList.toggle("fa-moon");
    darkModeBtn.classList.toggle("fa-sun");

    document.querySelector("html").classList.toggle("dark"); // toggles dark class

    
}); 