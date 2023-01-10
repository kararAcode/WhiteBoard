let darkModeBtn = document.querySelector("#darkModeBtn");

window.addEventListener("keypress", (e) => {
    // darkModeBtn.classList.toggle("fa-moon");
    // darkModeBtn.classList.toggle("fa-sun");

    if (e.key === "Enter") {
        document.querySelector("html").classList.toggle("dark");

    }
    
    
}); 

darkModeBtn.addEventListener("keypress", (e) => {
    darkModeBtn.classList.toggle("fa-moon");
    darkModeBtn.classList.toggle("fa-sun");

    document.querySelector("html").classList.toggle("dark");

    
    
    
}); 