const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll("#navMenu a");
const year = document.getElementById("year");

// Mobile navigation.
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Close the mobile menu after selecting a section.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Keep the footer year current.
year.textContent = new Date().getFullYear();
