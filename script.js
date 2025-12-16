let elements = document.querySelectorAll(".element");
let fullElements = document.querySelectorAll(".full-element");
let grid = document.querySelector(".all-elements");

elements.forEach(element => {
  element.addEventListener("click", function () {
    

    // hide all full sections first
    fullElements.forEach(sec => sec.style.display = "none");

    // show selected full section
    fullElements[this.id].style.display = "flex";
  });
});
