var marker = document.getElementById("marker");
var attempts = 1;
var colors, raw_guess, guessed_word, guessed_letter, skimmed_word;
var attempt_div, index_div, content_div, content_letter, content_p;
var p_words = [], m_words = [], d_words = [];

const words = [
  "rules", // Words NOT extracted from lyrics :D
  "other",
  "wanna",
  "gotta",
  "never",
  "gonna",
  "known",
  "heart",
  "going",
  "blind"
]

const word = "RULES"//words[Math.floor(Math.random() * words.length)].toUpperCase()

function parseInput() {
  guessed_word = guess_box.value.split("")
  raw_guess = guess_box.value.split("")
  skimmed_word = word.split("")
  colors = ["n", "n", "n", "n", "n"]
  for (var i = 0; i < 5; i++) { // i is 0, 1, 2, 3, 4 (same as Python range(5))
    guessed_letter = guessed_word[i]
    if (guessed_letter == skimmed_word[i]) {
      // First, we ONLY check for position + alphabet matches
      p_words.push(guessed_letter)
      guessed_word[i] = "0"
      skimmed_word[i] = "0"
      colors[i] = "p"
    } else if (guessed_letter != "0" && (skimmed_word.includes(guessed_letter))) {
      // Then, we ONLY check for alphabet matches
      m_words.push(guessed_letter)
      skimmed_word[skimmed_word.indexOf(guessed_letter)] = "0"
      guessed_word[i] = "0"
      colors[i] = "m"
    } else {
      d_words.push(guessed_letter)
    }
    if (p_words.includes(guessed_letter)) {
      window[guessed_letter + "_key"].classList.add("letter_p")
      window[guessed_letter + "_key"].classList.remove("letter_m")
    } else if (m_words.includes(guessed_letter)) {
      window[guessed_letter + "_key"].classList.add("letter_m")
    } else if (d_words.includes(guessed_letter)) {
      window[guessed_letter + "_key"].classList.add("disabled")
    }
  }

  attempt_div = document.createElement('div')
  attempt_div.classList.add("attempt")

  index_div = document.createElement('div')
  index_div.classList.add("index")
  if (guess_box.value == word) {
    index_div.innerHTML = "Guessed!"
    guess_box.disabled = true;
    for (var i of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
      window[i + "_key"].classList.add("disabled")
    }
  } else {
    index_div.innerHTML = "Attempt " + String(attempts)
  }
  attempt_div.append(index_div)

  content_div = document.createElement('div')
  content_div.classList.add("content")
  guess_box.value = ""

  for (var i = 0; i < 5; i++) { // i is 0, 1, 2, 3, 4 (same as Python range(5))
    // Time to show our values!
    content_p = document.createElement('p')
    content_p.innerHTML = raw_guess[i]

    content_letter = document.createElement('div')
    content_letter.classList.add("letter", `letter_${colors[i]}`)
    content_letter.append(content_p)
    content_div.append(content_letter)
  }

  attempt_div.append(content_div)
  marker.insertAdjacentElement('afterend', attempt_div)

  attempts += 1
}

enter_key.addEventListener("click", parseInput)
document.addEventListener("keyup", (ev) => {if (ev.key == "Enter") {parseInput();}});