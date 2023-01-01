let darkModeBtn = document.querySelector("#darkModeBtn");

darkModeBtn.addEventListener("click", (e) => {
    darkModeBtn.classList.toggle("fa-moon");
    darkModeBtn.classList.toggle("fa-sun");
    
    document.querySelector("html").classList.toggle("dark");
    
}); 