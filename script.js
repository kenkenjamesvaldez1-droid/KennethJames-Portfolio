// SAWAD PORTFOLIO INTERACTIVE CONTROLLER
document.addEventListener("DOMContentLoaded", () => {
  // MOBILE NAVIGATION TOGGLE
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // QUICK COPY FUNCTIONALITY
  const copyBtns = document.querySelectorAll(".copy-btn");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.dataset.copy;
      const targetId = btn.dataset.target;
      const targetElement = document.getElementById(targetId);

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        if (targetElement) {
          targetElement.textContent = "Copied!";
          setTimeout(() => {
            targetElement.textContent = "";
          }, 2500);
        }
      } catch (err) {
        if (targetElement) {
          targetElement.textContent = "Failed to copy";
        }
      }
    });
  });

  // CONTACT FORM SUBMISSION
  const contactForm = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status-msg");

  if (contactForm && statusMsg) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      statusMsg.textContent = "Thank you! Your message has been sent successfully.";
      contactForm.reset();
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 4000);
    });
  }
});
