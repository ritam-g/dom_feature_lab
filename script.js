let elements = document.querySelectorAll(".element");
let fullElements = document.querySelectorAll(".full-element");
let allElement= document.querySelector(".all-elements");
let buttons = document.querySelectorAll(".full-element button");

// OPEN FULL VIEW
elements.forEach(element => {
  element.addEventListener("click", function () {
    // hide allElement
    allElement.style.display = "none";

    // hide all full views
    fullElements.forEach(sec => {
      sec.style.display = "none";
    });

    // show selected full view
    fullElements[this.id].style.display = "flex";
  });
});

// CLOSE FULL VIEW
buttons.forEach(btn => {
  btn.addEventListener("click", function () {
    // hide all full views
    fullElements.forEach(sec => {
      sec.style.display = "none";
    });

    // show allElement again
    allElement.style.display = "flex";
  });
});
