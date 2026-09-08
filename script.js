// Get the elements once so the rest of the code stays clean.
const $ = id => document.getElementById(id);
let originalCodeword = "";

// Performs modulo-2 division and returns only the CRC remainder.
function divide(bits, generator) {
  const dividend = bits.split("");
  for (let i = 0; i <= dividend.length - generator.length; i++) {
    if (dividend[i] === "1") {
      for (let j = 0; j < generator.length; j++)
        dividend[i + j] = dividend[i + j] === generator[j] ? "0" : "1";
    }
  }
  return dividend.slice(-(generator.length - 1)).join("");
}

// Makes one clickable button for every transmitted bit.
function showBits(codeword) {
  $("bits").innerHTML = codeword.split("").map((bit, i) =>
    `<button class="bit" data-index="${i}">${bit}</button>`).join("");
}

// Creates the CRC remainder and transmitted codeword.
function generateCRC() {
  const data = $("data").value.trim();
  const generator = $("generator").value.trim();
  if (!/^[01]+$/.test(data) || !/^1[01]*1$/.test(generator) || generator.length < 2) {
    $("error").textContent = "Enter binary values only. The generator must start and end with 1.";
    return;
  }
  $("error").textContent = "";
  const paddedData = data + "0".repeat(generator.length - 1);
  const remainder = divide(paddedData, generator);
  originalCodeword = data + remainder;
  $("original").textContent = data;
  $("remainder").textContent = remainder;
  $("codeword").textContent = originalCodeword;
  $("results").classList.remove("hidden");
  showBits(originalCodeword);
  checkData();
}

// Checks whether the received frame leaves a zero remainder.
function checkData() {
  const received = [...document.querySelectorAll(".bit")].map(b => b.textContent).join("");
  const remainder = divide(received, $("generator").value.trim());
  const hasError = remainder.includes("1");
  $("receiverRemainder").textContent = remainder;
  $("verdict").classList.toggle("bad", hasError);
  $("verdict").querySelector(".verdict-icon").textContent = hasError ? "!" : "✓";
  $("verdictTitle").textContent = hasError ? "Transmission error detected" : "No error detected";
  $("verdictText").textContent = hasError ? "A non-zero remainder indicates that the frame was altered." : "The remainder is zero. Data integrity is verified.";
}

// Button events: generate, flip a bit, inject an error, restore and verify.
$("generateBtn").addEventListener("click", generateCRC);
$("preset").addEventListener("change", e => $("generator").value = e.target.value);
$("bits").addEventListener("click", e => {
  if (!e.target.classList.contains("bit")) return;
  e.target.textContent = e.target.textContent === "1" ? "0" : "1";
  e.target.classList.toggle("flipped");
});
$("randomBtn").addEventListener("click", () => {
  const allBits = document.querySelectorAll(".bit");
  if (allBits.length) allBits[Math.floor(Math.random() * allBits.length)].click();
});
$("resetBtn").addEventListener("click", () => { showBits(originalCodeword); checkData(); });
$("checkBtn").addEventListener("click", checkData);
generateCRC();
