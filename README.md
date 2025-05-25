

<div align="center">
<pre>
██ ███    ███  ██████         ██████ ██ ██████  ██   ██ ███████ ██████  
██ ████  ████ ██             ██      ██ ██   ██ ██   ██ ██      ██   ██ 
██ ██ ████ ██ ██   ███ █████ ██      ██ ██████  ███████ █████   ██████  
██ ██  ██  ██ ██    ██       ██      ██ ██      ██   ██ ██      ██   ██ 
██ ██      ██  ██████         ██████ ██ ██      ██   ██ ███████ ██   ██ 
-------------------------------------------------
img-cipher: Secure Image Encryption & Decryption in the Browser
</pre>


[![React](https://img.shields.io/badge/React-blue)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-green)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Overview

**`img-cipher`** is a lightweight, client-side web app built with **React** for securely **encrypting** and **decrypting images** directly in your browser. It uses modern cryptographic methods and works entirely offline — no servers, no tracking, no image uploads.

## Features

- 🔐 **AES-256 encryption** to securely encode image data
- 🔁 **Base64 encoding** to represent binary data as safe text
- 🧠 **Client-side only** — your images and passwords never leave your device
- 📱 **Responsive design** for seamless use on desktop and mobile
- 🧩 Simple, minimal UI with Material UI icons
- 🧾 **Password-protected encryption** with optional decryption toggle
- 🛠️ **No backend or cloud storage required**
- ✅ **Open source** under the MIT License


## 🧪 How It Works

- **Encoding:**  
  The image is read as binary, converted to Base64 text, then encrypted using **AES** (via `crypto-js`). The encrypted text can be saved as a `.txt` file.

- **Decoding:**  
  A `.txt` file is decrypted using the provided password, decoded from Base64, and converted back into the original image.


## Installation & Setup

Clone the repository and install dependencies:

```sh
git clone https://github.com/siddharthaasal/img-cipher.git
cd img-cipher
npm install
```

## Running Locally

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

* Navigate to **Encode** to upload and encrypt images with a password.
* Go to **Decode** to decrypt previously encrypted images by entering the correct password.
* Your images never leave your device — all processing happens client-side.



## License

This project is licensed under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or issue.