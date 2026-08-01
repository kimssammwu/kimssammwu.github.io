const header = document.querySelector(".site-header");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const rows = [...document.querySelectorAll(".story-row")];
const topicButtons = [...document.querySelectorAll(".topic-filter")];
const emptyFilter = document.querySelector(".empty-filter");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 },
  );
  rows.forEach((row) => observer.observe(row));
} else {
  rows.forEach((row) => row.classList.add("is-visible"));
}

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    topicButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    const topic = button.dataset.topic;
    let visibleCount = 0;
    rows.forEach((row) => {
      const visible = topic === "all" || row.dataset.category === topic;
      row.hidden = !visible;
      if (visible) {
        visibleCount += 1;
        row.classList.add("is-visible");
      }
    });
    if (emptyFilter) emptyFilter.hidden = visibleCount !== 0;
  });
});
