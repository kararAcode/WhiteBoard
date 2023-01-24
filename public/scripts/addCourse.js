let addCourseBtn = document.querySelector("#addCourseBtn");
let exitBtn = document.querySelector(".closeBtn");
let elems = document.querySelectorAll("body > *:not(#modal)");
let modal =document.querySelector("#modal");

addCourseBtn.addEventListener("click", toggleModal);
exitBtn.addEventListener("click", toggleModal)

function toggleModal() {
    //when popup is shown background is blurred 
   modal.classList.toggle("hidden");
   elems.forEach((elem) => {
        elem.classList.toggle("blur-sm")
    });
}