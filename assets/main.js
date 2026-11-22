// Update footer year automatically
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Filter focus area cards by category
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card) => {
      const matches =
        selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("site-header");
  if (headerContainer) {
    // If we are on GitHub Pages subfolder (/niallross-english/) vs local root
    const isGitHubPages = window.location.pathname.startsWith("/niallross-english");
    const basePath = isGitHubPages ? "/niallross-english/" : "/";
    
    // Fetch header using absolute root path
    fetch(`${basePath}components/header.html`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((data) => {
        headerContainer.innerHTML = data;

        // Highlight active link matching current URL
        const currentPath = window.location.pathname;
        const navLinks = headerContainer.querySelectorAll("nav a");
        
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === "about" || href === "about/" || href.includes("about")) {
            if (currentPath.includes("/about")) {
              link.classList.add("active");
            }
          } else if (href === "index.html" || href === "/" || href === "") {
            if (currentPath.endsWith("/") && !currentPath.includes("/about")) {
              link.classList.add("active");
            }
          }
        });
      })
      .catch((err) => console.error("Header fetch error:", err));
  }
});