// ===================================
// 1. Dark / Light Theme Toggle
// ===================================

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("selim-portfolio-theme");

// Apply saved theme
if (savedTheme === "light") {
  body.classList.add("light");
}

// Update theme button icon
themeToggle.textContent = body.classList.contains("light") ? "☾" : "☼";

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  const theme = body.classList.contains("light") ? "light" : "dark";

  // Save theme in Local Storage
  localStorage.setItem("selim-portfolio-theme", theme);

  // Update button icon
  themeToggle.textContent = theme === "light" ? "☾" : "☼";
});

// ===================================
// 2. Mobile Navigation
// ===================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

// Open / Close Mobile Menu
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation");

    menuToggle.textContent = "☰";
  });
});

// ===================================
// 3. Automatic Copyright Year
// ===================================

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

// ===================================
// 4. Scroll Reveal Animation
// ===================================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

// Select all reveal elements
const revealElements = document.querySelectorAll(".reveal");

// Observe each element
revealElements.forEach((element) => {
  observer.observe(element);
});

// Form Validation //

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageTextarea = document.getElementById("message");
const submitButton = document.querySelector("button[type='submit']");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageTextarea.value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  const allUserData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: messageTextarea.value.trim(),
  };
  console.log(allUserData);
});
