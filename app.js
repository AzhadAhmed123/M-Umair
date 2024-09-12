function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

let slideIndex = 0;
const slidesToShow = 3; // Number of slides to show at a time
const slides = document.querySelectorAll(".mySlides");
const slidesContainer = document.querySelector(".flexContainer2");
const totalSlides = slides.length;
const dotsContainer = document.getElementById("dotsContainer");
let dots = [];

// Create dots dynamically based on the number of slides
function createDots() {
  for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-slide", i);
    dot.addEventListener("click", function () {
      moveToSlide(i);
    });
    dotsContainer.appendChild(dot);
    dots.push(dot); // Store the dot in the array for easy access
  }
  updateDots(); // Update the initial active dot
}

// Move to a specific slide when clicking on a dot
function moveToSlide(index) {
  slideIndex = index;
  updateSliderPosition();
  updateDots(); // Update dots when slide changes
}

// Update slider position based on index
function updateSliderPosition() {
  const slideWidth = calculateSlideWidth(); // Recalculate slide width
  const translateX = -(slideIndex * slideWidth); // Calculate translate position
  slidesContainer.style.transform = `translateX(${translateX}px)`; // Apply the transform
  updateDots(); // Update the active dot
  updateSlidesAppearance(); // Update slides appearance
}

// Update dots to reflect the current slide
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === slideIndex) {
      dot.classList.add("active");
    }
  });
}

// Update slides appearance: blur and scale non-active slides
function updateSlidesAppearance() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.add("active");
      slide.classList.remove("blur");
    } else {
      slide.classList.add("blur");
      slide.classList.remove("active");
    }
  });
}

// Calculate slide width on load and resize
function calculateSlideWidth() {
  return (
    slides[0].offsetWidth +
    parseInt(window.getComputedStyle(slides[0]).marginRight)
  ); // Add right margin to width
}

// Handle dragging
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

function setPositionByIndex() {
  const slideWidth = calculateSlideWidth();
  currentTranslate = currentIndex * -slideWidth;
  slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function dragStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  slidesContainer.style.transition = "none";
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  // Snap to next or previous slide based on drag distance
  if (movedBy < -100 && currentIndex < totalSlides - slidesToShow) {
    currentIndex += 1;
  }
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setPositionByIndex();
  slidesContainer.style.transition = "transform 0.6s ease-in-out";
  prevTranslate = currentTranslate;
}

function dragAction(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

// Handle next and previous slide
function plusSlides(n) {
  slideIndex += n;

  // Prevent moving beyond first and last slides
  if (slideIndex < 0) {
    slideIndex = 0;
  } else if (slideIndex > totalSlides - slidesToShow) {
    slideIndex = totalSlides - slidesToShow;
  }

  updateSliderPosition(); // Update slider based on new index
}

// Adjust on window resize
window.addEventListener("resize", updateSliderPosition);

// Initial position update and dot creation after page load

function updateSliderPosition() {
  const slideWidth = calculateSlideWidth(); // Recalculate slide width
  const translateX = -(slideIndex * slideWidth); // Calculate translate position
  slidesContainer.style.transform = `translateX(${translateX}px)`; // Apply the transform

  // Add classes for the current slide
  slides.forEach((slide, index) => {
    if (index === slideIndex + Math.floor(slidesToShow / 1)) {
      slide.classList.add("focused");
      slide.classList.remove("not-focused");
    } else {
      slide.classList.add("not-focused");
      slide.classList.remove("focused");
    }
  });

  updateDots(); // Update the active dot
}

// Adjust on window resize
window.addEventListener("resize", updateSliderPosition);

// Initial position update and dot creation after page load
window.addEventListener("load", function () {
  updateSliderPosition();
  createDots(); // Generate dots
});

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
