const dots = document.querySelector(".dots");

dots.addEventListener("click", (e) => {
  const { tagName, classList } = e.target;

  if (tagName !== "LI") return;

  const active = document.querySelector(".active");

  active.classList.remove("active");
  classList.add("active");
});
