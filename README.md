# Quizlet Write Mode Hints
A simple browser bookmarklet that enhances Quizlet's Write mode by automatically displaying first-letter hints for questions.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This tool helps you practice vocabulary more effectively by providing a subtle hint - the first letter of the answer - when you're stuck on a question. The script intelligently matches questions with their corresponding answers and displays hints directly within Quizlet's interface.

## Features
- Automatically shows the first letter of answers in Write mode
- Seamlessly integrates with Quizlet's interface
- Works with both term→definition and definition→term questions
- Adapts to Quizlet's light and dark themes
- Toggle hints on/off with a single click
- No external dependencies or permissions required
- Modern design with toasts that inform you whether hints are active or not

## Installation
1. Select the entire code below (by triple clicking on it), and drag the selected text to your preferred place in your bookmarks bar. 
2. Edit the bookmark and name it something like "Quizlet Hints" (By right clicking on the newly created bookmark and clicking edit)
3. Enjoy!

```javascript
javascript: (function () { window.quizletHints = !window.quizletHints; let e, t, n = [], o = ""; function i() { document.getElementById("inline-hint")?.remove(), e?.disconnect(), t?.disconnect() } if (!window.quizletHints) return i(), c("Hints OFF"); function r() { try { return JSON.parse(document.getElementById("__NEXT_DATA__").textContent).props.pageProps.studyModesCommon.studiableDocumentData.studiableItems.map(e => { const t = e.cardSides.find(e => "word" === e.label).media.find(e => 1 === e.type).plainText, n = e.cardSides.find(e => "definition" === e.label).media.find(e => 1 === e.type).plainText; return { term: t, def: n } }) } catch (e) { return console.error("Data error:", e), [] } } function s(e) { const t = document.querySelector(".WriteQuestion"), n = t?.querySelector(".WriteQuestion-answer"); if (!t || !n) return !1; document.getElementById("inline-hint")?.remove(); const o = document.body.className.includes("theme-night"), i = document.createElement("div"); return i.id = "inline-hint", i.textContent = `Hint: ${e}___`, i.style.fontWeight = "bold", i.style.padding = "10px", i.style.textAlign = "center", i.style.borderBottom = ".125rem solid var(--gray-200-gray-900)", i.style.color = o ? "#fff" : "#000", i.style.backgroundColor = o ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)", t.insertBefore(i, n), !0 } function a() { const e = document.querySelector(".WriteTextAttribute")?.firstChild?.ariaLabel; if (!e || e === o) return; o = e; let t = n.find(t => t.term === e); return t ? s(t.def.charAt(0).toUpperCase()) : (t = n.find(t => t.def === e)) ? s(t.term.charAt(0).toUpperCase()) : s("?") } function d() { return e = new MutationObserver(e => { const n = document.querySelector(".WriteTextAttribute"); n && (t = new MutationObserver(a), t.observe(n.firstChild, { attributes: !0, attributeFilter: ["aria-label"] }), a()) }), e.observe(document.body, { childList: !0, subtree: !0 }), e } function l() { new MutationObserver(() => { const e = document.getElementById("inline-hint"); if (e) { const t = document.body.className.includes("theme-night"); e.style.color = t ? "#fff" : "#000", e.style.backgroundColor = t ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" } }).observe(document.body, { attributes: !0 }) } function c(e) { const t = document.getElementById("quizlet-hint-toast"); t && t.remove(); const n = document.createElement("div"); if (n.id = "quizlet-hint-toast", n.textContent = e, n.style.position = "relative", n.style.top = "50%", n.style.left = "50%", n.style.transform = "translate(-50%, -50%)", n.style.margin = "30px 0 0 0", n.style.padding = "10px", n.style.borderRadius = "5px", n.style.zIndex = "9999", n.style.color = "white", n.style.background = "#4257b2", n.style.maxWidth = "fit-content", n.style.opacity = "0", n.style.transition = "opacity 0.5s ease-in-out", document.querySelector(".WriteQuestion")) { document.querySelector(".WriteQuestion").appendChild(n), setTimeout(() => { n.style.opacity = "1" }, 10), setTimeout(() => { n.style.opacity = "0", n.addEventListener("transitionend", function () { n.remove() }) }, 2e3) } } n = r(), e = d(), l(), c("Hints ON"), a() })();
```

## Usage
1. Go to Quizlet and open any set in Write mode
2. Click the "Quizlet Hints" bookmark
3. A hint containing the first-letter of the answer will appear below each question
4. Click the bookmark again to toggle the hints off



## Screenshots
### Dark mode:
![image](https://github.com/user-attachments/assets/f2b2dd23-2b01-4ffc-bf80-88ea871805ce)

#### With hints on...
![image](https://github.com/user-attachments/assets/57ff7423-09d9-40d2-b388-a99666d8aba4)

#### And off...
![image](https://github.com/user-attachments/assets/bdae7202-aef6-40c9-8dc9-6343367d2519)


### Light mode:
![image](https://github.com/user-attachments/assets/e605bb89-a08c-4135-a924-1ffe778bd55a)

#### With hints on...
![image](https://github.com/user-attachments/assets/3c540ad4-3804-4166-89dd-7d2ff97d8e1e)

#### And off...
![image](https://github.com/user-attachments/assets/c2d4b665-d75f-4e94-bcdc-af58bb1493da)


## How It Works
This script:
1. Extracts flashcard data from Quizlet's internal JSON
2. Identifies the current question being displayed
3. Matches it with the corresponding term or definition
4. Displays the first letter of the answer as a hint
5. Updates automatically as you progress through questions
6. Adapts to theme changes between light and dark mode

## Contributing
Contributions are welcome! If you'd like to improve this script:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the [MIT License](LICENSE).

## Disclaimer
This tool is intended for educational purposes to help students learn more effectively. Please use responsibly and in accordance with Quizlet's terms of service.

---

Created with ❤️ by Sukarth Acharya
