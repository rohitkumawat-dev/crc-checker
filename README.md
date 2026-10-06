# CRC Lab — Error Detection Simulator

An interactive **Cyclic Redundancy Check (CRC)** simulator for digital communication. Generate a CRC codeword, flip bits to simulate transmission errors, and verify the received frame, all in one browser workspace.

**Live demo:** [crc-checker.vercel.app](https://crc-checker.vercel.app/)

![CRC Lab screenshot]<img width="1012" height="906" alt="Screenshot 2026-09-09 004713" src="https://github.com/user-attachments/assets/51a9ee82-5b7f-42cd-ba7e-9580965a7f37" />
---

## What is CRC?

A cyclic redundancy check is an error-detecting code used in digital networks and storage devices to catch accidental changes to data. It works on **modulo-2 division**, which uses only XOR operations instead of ordinary binary subtraction.

The sender divides the message by an agreed generator polynomial and attaches the remainder to the data. The receiver divides the whole frame by the same generator. A **zero remainder** means no error was detected; a non-zero remainder means the data was corrupted.

## Features

- **Generate** a CRC remainder and the full transmitted codeword from any binary message
- **Generator presets** for CRC-3 (`1011`) and CRC-4 (`10011`), plus a custom polynomial input
- **Simulate transmission errors** by clicking any bit in the codeword to flip it
- **Inject a random error** with one click
- **Restore** the original frame at any time
- **Verify at the receiver** and see the remainder and a clear pass/fail verdict
- Built-in "How it works" section explaining the algorithm
- Responsive, single-page UI with no build step

## How it works

1. **Append zeros:** add `n − 1` zeros to the data, where `n` is the generator length.
2. **Modulo-2 divide:** divide the padded data by the generator using XOR.
3. **Attach remainder:** replace the appended zeros with the CRC remainder to form the codeword.
4. **Verify:** the receiver divides the received codeword by the same generator. A zero remainder means no error was detected.

### Worked example

| Item | Value |
| --- | --- |
| Data bits | `1101011011` |
| Generator | `10011` (CRC-4) |
| Data + 4 appended zeros | `11010110110000` |
| CRC remainder | `1110` |
| Transmitted codeword | `11010110111110` |

Dividing the codeword by `10011` at the receiver gives remainder `0000`, so the frame passes. Flip any bit and the remainder becomes non-zero.

## Usage

1. Enter the **data bits** (binary, up to 24 bits).
2. Choose a **generator** from the presets or type your own polynomial in binary (up to 12 bits).
3. Click **Generate CRC** to see the original data, remainder, and codeword.
4. In the transmission channel, **click bits to flip them** or use **Inject random error**.
5. Click **Verify at receiver** to see whether the error is detected.
6. Use **Restore frame** to reset and try again.

## Getting started

No dependencies or build tools are needed.

```bash
# Clone the repository
git clone https://github.com/rohitkumawat-dev/crc-checker.git
cd crc-checker

# Open in your browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Or serve it locally:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Project structure

```
crc-checker/
├── index.html    # Page markup and layout
├── style.css     # Styling and theme
├── script.js     # CRC generation, bit flipping, and verification logic
└── README.md
```

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: DM Sans and Space Mono
- Deployed on Vercel

## Possible improvements

- Standard presets such as CRC-8, CRC-16, and CRC-32
- Step-by-step animation of the long division
- Burst-error simulation and detection-rate statistics

## Author

**Rohit Kumawat**
GitHub: [@rohitkumawat-dev](https://github.com/rohitkumawat-dev)

---

If you found this useful, consider giving the repo a star.
