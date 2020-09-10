const changeSwitch = document.querySelector(".switch");

const CLICKED_SWITCH = "switch-off";
const CLICKED_BUTTON = "button-off";

changeSwitch.addEventListener("click", (e) => {
  e.stopPropagation();
  const { classList, tagName } = e.target;
  console.log(tagName);

  classList.toggle(CLICKED_SWITCH);
});
