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
// ===================================
// 5. Contact Form Submission
// ===================================

const form = document.getElementById("contact-form");

const submitButton = form.querySelector("button[type='submit']");
const buttonText = submitButton.querySelector(".btn-text");

const API_URL = "http://localhost:5000/api/contact";

// Toast Notification Function
function showToast(message, type = "success") {
  const toast = document.createElement("div");

  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Form Submit Event
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Empty field validation
  if (!name || !email || !subject || !message) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  // Loading state
  submitButton.disabled = true;
  buttonText.textContent = "Sending...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong!");
    }

    // Reset form after successful submission
    form.reset();

    if (result.emailSent) {
      showToast("Message sent successfully!", "success");
    } else {
      showToast(
        "Message received, but email notification failed.",
        "warning"
      );
    }

  } catch (error) {
    console.error("Contact Form Error:", error);

    showToast(
      error.message || "Failed to send message. Please try again.",
      "error"
    );

  } finally {
    // Restore button
    submitButton.disabled = false;
    buttonText.textContent = "Send Message";
  }
});