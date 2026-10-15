
/* =========================================
   MISCHENKO EDU — MATERIAL LIBRARY
   script.js
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const directionFilter = document.getElementById("directionFilter");
  const accessFilter = document.getElementById("accessFilter");
  const resetFilters = document.getElementById("resetFilters");
  const resetEmpty = document.getElementById("resetEmpty");

  const catalogGrid = document.getElementById("catalogGrid");
  const visibleCount = document.getElementById("visibleCount");
  const filterSummary = document.getElementById("filterSummary");
  const emptyState = document.getElementById("emptyState");

  if (
    !directionFilter ||
    !accessFilter ||
    !catalogGrid ||
    !visibleCount ||
    !filterSummary ||
    !emptyState
  ) {
    console.warn("Mischenko Edu: элементы каталога не найдены.");
    return;
  }

  const cards = Array.from(
    catalogGrid.querySelectorAll(".material-card")
  );

  const directionNames = {
    all: "Все направления",
    physics: "Физика",
    informatics: "Информатика",
    math: "Математика",
    python: "Python",
    figma: "Figma",
    html: "HTML / CSS"
  };

  const accessNames = {
    all: "Все материалы",
    free: "Бесплатно",
    paid: "Платно"
  };

  function updateCatalog() {
    const selectedDirection = directionFilter.value;
    const selectedAccess = accessFilter.value;

    let count = 0;

    cards.forEach((card) => {
      const matchesDirection =
        selectedDirection === "all" ||
        card.dataset.category === selectedDirection;

      const matchesAccess =
        selectedAccess === "all" ||
        card.dataset.access === selectedAccess;

      const isVisible = matchesDirection && matchesAccess;

      card.hidden = !isVisible;

      if (isVisible) {
        count += 1;
      }
    });

    visibleCount.textContent = String(count);

    filterSummary.textContent =
      `${directionNames[selectedDirection] || "Все направления"} · ` +
      `${accessNames[selectedAccess] || "Все материалы"}`;

    emptyState.hidden = count !== 0;
    catalogGrid.hidden = count === 0;

    const totalLabel = document.querySelector(".catalog-total > span");

    if (totalLabel) {
      totalLabel.innerHTML = "МАТЕРИАЛОВ<br>В КАТАЛОГЕ";
    }

    document.querySelectorAll("[data-direction-link]").forEach((link) => {
      const isActive =
        selectedDirection !== "all" &&
        link.dataset.directionLink === selectedDirection;

      link.classList.toggle("direction-selected", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function clearFilters() {
    directionFilter.value = "all";
    accessFilter.value = "all";
    updateCatalog();
  }

  directionFilter.addEventListener("change", updateCatalog);
  accessFilter.addEventListener("change", updateCatalog);

  resetFilters?.addEventListener("click", clearFilters);
  resetEmpty?.addEventListener("click", clearFilters);

  document.querySelectorAll("[data-direction-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const direction = link.dataset.directionLink;

      if (directionNames[direction]) {
        directionFilter.value = direction;
        accessFilter.value = "all";
        updateCatalog();
      }
    });
  });

  updateCatalog();
});
