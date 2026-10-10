
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // WELCOME SCREEN — FIXED TO MATCH YOUR HTML
  // ==========================================

  const welcomeScreen = document.getElementById("welcome-screen");
  const exploreButton = document.getElementById("explore-button");
  const skipIntroButton = document.getElementById("skip-intro");

  function closeWelcome() {
    if (!welcomeScreen) return;

    welcomeScreen.classList.add("intro-hidden");
    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.visibility = "hidden";
    welcomeScreen.style.pointerEvents = "none";

    document.body.style.overflow = "";
  }

  if (exploreButton) {
    exploreButton.addEventListener("click", (event) => {
      event.preventDefault();
      closeWelcome();

      // Bring the main portfolio into view
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (skipIntroButton) {
    skipIntroButton.addEventListener("click", (event) => {
      event.preventDefault();
      closeWelcome();
    });
  }

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ==========================================
  // BACK TO TOP
  // ==========================================

  const backToTop = document.getElementById("back-to-top");

  function updateBackToTop() {
    if (!backToTop) return;

    const showButton = window.scrollY > 400;

    backToTop.style.opacity = showButton ? "1" : "0";
    backToTop.style.pointerEvents = showButton ? "auto" : "none";
  }

  window.addEventListener("scroll", updateBackToTop);
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ==========================================
  // FOOTER YEAR
  // ==========================================

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ==========================================
  // ACTUAL BUTTERFLY IMAGES
  // ==========================================

  const butterflyField = document.getElementById("butterfly-field");

  if (butterflyField && butterflyField.children.length === 0) {
    const butterflyPositions = [
      { left: "5%", top: "18%", size: 48, duration: 17, delay: -4 },
      { left: "78%", top: "22%", size: 58, duration: 21, delay: -9 },
      { left: "88%", top: "55%", size: 42, duration: 19, delay: -6 },
      { left: "15%", top: "72%", size: 52, duration: 23, delay: -12 },
      { left: "58%", top: "84%", size: 38, duration: 18, delay: -3 }
    ];

    butterflyPositions.forEach((item, index) => {
      const butterfly = document.createElement("img");

      butterfly.src = index % 2 === 0
        ? "images/butterfly-1.png"
        : "images/butterfly-2.png";

      butterfly.alt = "";
      butterfly.setAttribute("aria-hidden", "true");
      butterfly.className = "floating-butterfly";

      butterfly.style.left = item.left;
      butterfly.style.top = item.top;
      butterfly.style.width = `${item.size}px`;
      butterfly.style.animationDuration = `${item.duration}s`;
      butterfly.style.animationDelay = `${item.delay}s`;

      butterflyField.appendChild(butterfly);
    });
  }

  // ==========================================
  // IMAGE / VIDEO LIGHTBOX PREVIEW
  // ==========================================

  const lightboxStyle = document.createElement("style");

  lightboxStyle.textContent = `
    .portfolio-lightbox {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(12, 5, 12, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      opacity: 0;
      visibility: hidden;
      transition: opacity .25s ease, visibility .25s ease;
    }

    .portfolio-lightbox.open {
      opacity: 1;
      visibility: visible;
    }

    .lightbox-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      max-width: 1100px;
      max-height: 90vh;
      width: 100%;
      transform: scale(.96);
      transition: transform .25s ease;
    }

    .portfolio-lightbox.open .lightbox-inner {
      transform: scale(1);
    }

    .lightbox-inner img,
    .lightbox-inner video {
      display: block;
      max-width: 100%;
      max-height: 78vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 0 35px rgba(255, 125, 190, .18);
      background: #170c16;
    }

    .lightbox-inner video {
      width: min(100%, 1000px);
    }

    .lightbox-caption {
      color: #ffe1ef;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      text-align: center;
    }

    .lightbox-close {
      position: fixed;
      top: 18px;
      right: 24px;
      width: 46px;
      height: 46px;
      border: 1px solid rgba(255, 210, 233, .5);
      border-radius: 50%;
      color: white;
      background: rgba(255, 230, 242, .12);
      font-size: 28px;
      cursor: pointer;
      z-index: 2;
    }

    .lightbox-close:hover {
      background: rgba(255, 130, 190, .35);
    }

    .portfolio-previewable {
      cursor: zoom-in;
    }

    @media (max-width: 600px) {
      .portfolio-lightbox {
        padding: 14px;
      }

      .lightbox-close {
        top: 12px;
        right: 12px;
      }

      .lightbox-inner img,
      .lightbox-inner video {
        max-height: 72vh;
      }
    }
  `;

  document.head.appendChild(lightboxStyle);

  const lightbox = document.createElement("div");
  lightbox.className = "portfolio-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Portfolio media preview");

  const lightboxClose = document.createElement("button");
  lightboxClose.className = "lightbox-close";
  lightboxClose.type = "button";
  lightboxClose.setAttribute("aria-label", "Close preview");
  lightboxClose.textContent = "×";

  const lightboxInner = document.createElement("div");
  lightboxInner.className = "lightbox-inner";

  const lightboxMedia = document.createElement("div");
  lightboxMedia.className = "lightbox-media";

  const lightboxCaption = document.createElement("div");
  lightboxCaption.className = "lightbox-caption";

  lightboxInner.append(lightboxMedia, lightboxCaption);
  lightbox.append(lightboxClose, lightboxInner);
  document.body.appendChild(lightbox);

  let lastFocusedElement = null;

  function openLightbox(element) {
    const isVideo = element.tagName.toLowerCase() === "video";

    let source = element.currentSrc || element.src;

    if (isVideo && !source) {
      const sourceTag = element.querySelector("source");
      if (sourceTag) source = sourceTag.src;
    }

    if (!source) return;

    lastFocusedElement = document.activeElement;
    lightboxMedia.replaceChildren();

    const media = document.createElement(isVideo ? "video" : "img");
    media.src = source;

    if (isVideo) {
      media.controls = true;
      media.autoplay = true;
      media.playsInline = true;
    } else {
      media.alt = element.alt || "Portfolio image preview";
    }

    lightboxMedia.appendChild(media);

    const card = element.closest(
      ".design-card, .project-card, .certificate-card"
    );

    const heading = card?.querySelector("h3, h2, h4");

    lightboxCaption.textContent =
      heading?.textContent?.trim() ||
      element.alt ||
      (isVideo ? "Video Preview" : "Image Preview");

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();

    if (isVideo) {
      const playAttempt = media.play();

      if (playAttempt && playAttempt.catch) {
        playAttempt.catch(() => {
          // The user can press Play in the video controls.
        });
      }
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("open");

    const video = lightboxMedia.querySelector("video");

    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }

    lightboxMedia.replaceChildren();
    document.body.style.overflow = "";

    if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    }
  }

  const previewMedia = document.querySelectorAll(
    "#designs .design-card img, " +
    "#designs .design-card video, " +
    "#projects .project-card img, " +
    "#certificates .certificate-card img"
  );

  previewMedia.forEach((element) => {
    element.classList.add("portfolio-previewable");
    element.setAttribute("tabindex", "0");

    element.addEventListener("click", () => {
      openLightbox(element);
    });

    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(element);
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
});
