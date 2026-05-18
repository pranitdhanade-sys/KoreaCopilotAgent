// M365 Agent Templates — landing page interactions
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "메뉴 열기");
        }
      });
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Template filter + search ---------- */
  const tabs = Array.from(document.querySelectorAll(".filter-tab"));
  const cards = Array.from(document.querySelectorAll(".template-card"));
  const searchInput = document.getElementById("template-search");
  const noResults = document.getElementById("no-results");

  let currentFilter = "all";
  let currentQuery = "";

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function applyFilters() {
    let visibleCount = 0;
    const query = normalize(currentQuery);

    cards.forEach((card) => {
      const type = card.getAttribute("data-type") || "";
      const text = normalize(card.textContent);

      const matchesType = currentFilter === "all" || type === currentFilter;
      const matchesQuery = query === "" || text.includes(query);
      const visible = matchesType && matchesQuery;

      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (noResults) {
      noResults.classList.toggle("is-visible", visibleCount === 0);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      currentFilter = tab.getAttribute("data-filter") || "all";
      applyFilters();
    });
  });

  if (searchInput) {
    let debounceId;
    searchInput.addEventListener("input", (event) => {
      clearTimeout(debounceId);
      const value = event.target.value;
      debounceId = setTimeout(() => {
        currentQuery = value;
        applyFilters();
      }, 80);
    });
  }

  /* ---------- "Download all" placeholder behavior ---------- */
  const downloadAllBtn = document.getElementById("download-all");
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener("click", () => {
      // Real bundle is not wired yet — provide a friendly hint instead of a broken link.
      const visibleCards = cards.filter((c) => !c.hidden).length;
      const label = visibleCards === cards.length
        ? "전체 템플릿 패키지는 곧 제공될 예정입니다."
        : `현재 표시 중인 ${visibleCards}개 항목을 묶는 번들은 준비 중입니다.`;
      // eslint-disable-next-line no-alert
      alert(label + "\n각 카드의 개별 다운로드를 이용해 주세요.");
    });
  }
})();
