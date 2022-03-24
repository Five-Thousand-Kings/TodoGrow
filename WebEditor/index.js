// I know, this is a hardcoded mess... But it does what it should do, so...

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadNow() {
  download("script.pbs", tx);
}
var tx;

function update(text) {
  tx = text;
  let result_element = document.querySelector("#highlighting-content");
  // Handle final newlines (see article)
  if (text[text.length - 1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text
    .replace(new RegExp("&", "g"), "&amp;")
    .replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  // Syntax Highlight
  window.csHighlight({
    patterns: [
      {
        name: "blocktoken",
        match: /^(else|end)/,
      },
      {
        name: "conditionalnocheck",
        match: [/^((while|if|elseif)[ ]*$)/, "", "…"],
      },
      {
        name: "conditionalchecked", // /^((while|if|elseif) [\(\)+\-*\/%\$a-zA-Z _.\d]+)/,
        match: /^((while|if|elseif))/,
      },
      {
        name: "token",
        match: /^(and|or|not|[><\-+%=])/,
      },
      {
        name: "token",
        match: /^(set|add|remove|rmv|divide|div|multiply|mtp|ply|up|down)/,
      },
      {
        name: "number",
        match: /^([\d]+)/,
      },
      {
        name: "string",
        match: /^("[\(\)+\-*\/%\$a-zA-Z ,_\.\d]*")/,
      },
      {
        name: "varkey",
        match: /^(var[ ]*[a-zA-Z_\d]*)/,
      },
      {
        name: "prequire",
        match: [/^(request[ ]*$)/, "", "…"],
      },
      {
        name: "require",
        match: /^(request[ ]*[a-zA-Z \/_\.\d]+)/,
      },
      {
        name: "iactionpre",
        match: [/^((i|me|mailman|crop|inventory)[ ]*$)/, "", "…"],
      },
      {
        name: "iactionpre2",
        match: [
          /^((mailman (send|mail)|inventory (has|contains)|(i|me) (move|plant)|crop (is|isnot))[ ]*$)/,
          "",
          "…",
        ],
      },
      {
        name: "iaction",
        match: /^((i|me) (harvest|move "(left|right|up|down)"|moved|plant))/,
      },
      {
        name: "iaction",
        match: /^(mailman (mail|send))/,
      },
      {
        name: "iaction",
        match: /^(inventory (contains ([a-z\-]+)|has \d ([a-z\-]+)))/,
      },
      {
        name: "iaction",
        match: /^(crop)/,
      },
      {
        name: "iaction", // stuff like varname is number
        match: /^((is|isnot) ([a-z]+))/,
      },
      {
        name: "iaction",
        match: /^((random (number|bool|boolean))|random[ ]*)/,
      },
      {
        name: "comment",
        match: /^(\/\/[\(\)+\-*\/%\$a-zA-Z<>=\/\\+\-% ,_.\d]+)/,
      },
    ],
    selector: "pre pre",
  });
}

function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
  let code = element.value;
  if (event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
}
