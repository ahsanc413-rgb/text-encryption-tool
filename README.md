# CipherBox – Web-Based Text Encryption Tool

A single-page web app where you type some text, pick an algorithm, and get the ciphertext back. It can also decrypt, hash with SHA-256, copy the result, and save encrypted messages to your account.

Built with **HTML/CSS/JavaScript** on the frontend and **Node.js + Express** on the backend.

## Features

- 9 algorithms grouped in a dropdown:
  - **Classical:** Caesar, Vigenère, Rail Fence, Columnar Transposition
  - **Modern:** AES, DES, RSA (2048-bit)
  - **Encoding / Hashing:** Base64, SHA-256
- Encrypt **and** decrypt (except SHA-256, which is one-way)
- Validation on both client and server (empty text, no algorithm selected, missing key, bad ciphertext)
- One-click copy and a "Use as input" button to quickly decrypt what you just encrypted
- Register / log in and save encrypted messages (only the ciphertext is stored, never the plain text or key)

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm start
```

Then open http://localhost:3000.

On first run the app creates a `data/` folder containing the user database (`db.json`) and the server's RSA key pair. This folder is git-ignored.

## Project structure

```
├── server.js              # Express setup (sessions, static files, API)
├── src/
│   ├── routes.js          # API endpoints
│   ├── db.js              # JSON file storage for users and messages
│   └── ciphers/
│       ├── classical.js   # Caesar, Vigenère, Rail Fence, Columnar
│       ├── modern.js      # AES, DES, RSA, Base64, SHA-256
│       └── index.js       # algorithm list + single run() entry point
└── public/
    ├── index.html
    ├── style.css
    └── app.js             # frontend logic
```

## API

| Method | Endpoint             | Description                                        |
| ------ | -------------------- | -------------------------------------------------- |
| GET    | `/api/algorithms`    | List of available algorithms                       |
| POST   | `/api/process`       | `{ text, algorithm, mode, key }` → `{ output }`    |
| GET    | `/api/rsa-public-key`| Server's RSA public key (PEM)                      |
| POST   | `/api/register`      | Create account                                     |
| POST   | `/api/login`         | Log in                                             |
| POST   | `/api/logout`        | Log out                                            |
| GET    | `/api/messages`      | Saved messages of the logged-in user               |
| POST   | `/api/messages`      | Save a message                                     |
| DELETE | `/api/messages/:id`  | Delete a message                                   |

## How the algorithms work (short version)

| Algorithm | Type | Key | Notes |
| --- | --- | --- | --- |
| Caesar | Substitution | Shift number | Every letter moves N places in the alphabet. |
| Vigenère | Polyalphabetic substitution | Keyword | `Ei = (Pi + Ki) mod 26`. Key `PASWD` on "make it happen now" gives `baca li hslstn fkz`. |
| Rail Fence | Transposition | Number of rails | Text is written in a zig-zag and read row by row. |
| Columnar | Transposition | Number or word | Text is written in rows and columns are read in key order (padded with `x`). |
| AES | Symmetric block cipher | Passphrase | AES-256-CBC via CryptoJS; key and IV are derived from the passphrase with a random salt. |
| DES | Symmetric block cipher | Passphrase | 56-bit key, included for comparison. Considered insecure today. |
| RSA | Asymmetric | Server key pair | RSA-OAEP with SHA-256. Max 190 bytes per message. |
| Base64 | Encoding | – | Not encryption, anyone can decode it. |
| SHA-256 | Hash | – | One-way 256-bit digest, can't be reversed. |

## Author

Muhammad Ahsan Ashfaq – Bahria University, Lahore Campus
