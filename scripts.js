(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealEls.length) {
    if (prefersReducedMotion) {
      revealEls.forEach(el => el.classList.add("in"));
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      }, { threshold: 0.12 });

      revealEls.forEach(el => io.observe(el));
    } else {
      // Very old browsers fallback
      revealEls.forEach(el => el.classList.add("in"));
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    const key = e.key.toLowerCase();
    if (key === "d") window.location.href = "./dev.html";
    if (key === "s") window.location.href = "./security.html";
    if (key === "h") window.location.href = "./";
  });
})();
