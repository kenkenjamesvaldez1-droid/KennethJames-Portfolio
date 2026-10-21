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

/* ========================================
   CLICK-TO-ENLARGE IMAGE LIGHTBOX
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeButton = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImage || !closeButton) return;

  let previouslyFocusedElement = null;

  // Enable the lightbox for valid images across the portfolio.
  document.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("src")) return;

    img.classList.add("lightbox-enabled");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");

    if (!img.hasAttribute("aria-label")) {
      img.setAttribute(
        "aria-label",
        `Open full-size image: ${img.alt || "Portfolio image"}`
      );
    }

    img.addEventListener("click", () => openLightbox(img));

    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  function openLightbox(img) {
    // Ignore empty or broken image sources.
    if (!img.complete || img.naturalWidth === 0) return;

    previouslyFocusedElement = document.activeElement;

    // Use the original image source, not its cropped thumbnail.
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || "Full-size portfolio image";
    lightboxCaption.textContent = img.alt || "";

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox.classList.contains("active")) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  closeButton.addEventListener("click", closeLightbox);

  // Close when clicking the dark overlay, but not the image itself.
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Close using the Escape key.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      lightbox.classList.contains("active")
    ) {
      closeLightbox();
    }
  });
});
