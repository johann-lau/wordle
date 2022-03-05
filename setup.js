var keyboard = document.getElementById("keyboard");
var hide_button = document.getElementById("hide");
var guess_box = document.getElementById("guess");
var clientWidth = document.documentElement.clientWidth;

var delete_key = document.getElementById("delete")
var enter_key = document.getElementById("enter")
for (var i of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  window[i + "_key"] = document.getElementById(i)
  window[i + "_key"].addEventListener("click", (ev) => {if (!ev.target.classList.contains("disabled") && guess_box.value.length < 5) {guess_box.value += ev.target.id;}})
}

function parseGuess() {
  guess_box.value = guess_box.value.slice(0, 5).toUpperCase().replace(/[^A-Z]+/gi, '');
}

function toggleKeyboard() {
  keyboard.classList.toggle("hidden");
}

if (clientWidth >= 800) {
  toggleKeyboard();
}

hide_button.addEventListener("click", toggleKeyboard)
delete_key.addEventListener("click", () => {guess_box.value = guess_box.value.slice(0, -1)})