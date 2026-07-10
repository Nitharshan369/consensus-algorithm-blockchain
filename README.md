# Blockchain Consensus Explorer

An interactive, educational web platform designed to demystify blockchain technology and provide an in-depth exploration of various consensus algorithms. Built with a stunning, modern UI, this project serves as a comprehensive learning tool for understanding how decentralized networks reach agreement.

## 🚀 Features

The application is structured into four main exploratory sections:

### 1. Overview (`index.html`)
A foundational introduction to blockchain technology, covering:
*   **Core Properties:** Decentralization, Transparency, Immutability, and Security.
*   **Key Components:** Nodes, Ledgers, Wallets, Hashes, Nonces, and Smart Contracts.
*   **Transaction Lifecycle:** Step-by-step breakdown from ECDSA signing to block confirmation.
*   **Concepts:** The 6-Confirmation Rule and the Blockchain Trilemma (Scalability vs. Security vs. Decentralization).

### 2. Algorithms Details (`algorithm.html`)
Deep dives into **10 different Consensus Algorithms** (PoW, PoS, DPoS, PoA, PoH, PBFT, PoSpace, PoB, PoET, PoI). Each algorithm's page features:
*   **Mechanism Explanation:** Clear, concise breakdowns of how the algorithm functions.
*   **Live Simulation:** Canvas-based real-time visualizations of the consensus process (`animations.js`).
*   **Interactive Demo:** Hands-on, step-by-step interactive demonstrations (`demo.js`).
*   **Trilemma Scorecard:** Radar charts evaluating Scalability, Security, and Decentralization.
*   **Real-World Mapping:** Examples of actual blockchains using the algorithm and their supported smart contract languages.
*   **Classification & Compatibility:** Layer 1 vs. Layer 2 classifications and consensus family compatibility.
*   **Performance Metrics:** TPS, block time, finality, energy usage, pros, and cons.

### 3. Compatibility Matrix (`compatibility.html`)
An interactive "Global View" matrix illustrating consensus family compatibility across popular real-world blockchains (e.g., Bitcoin, Ethereum, Solana, Cardano). It helps users understand protocol-level vs. consensus-level similarity.

### 4. Algorithm Comparison (`comparison.html`)
A comprehensive side-by-side premium feature matrix comparing all 10 algorithms based on:
*   Mining & Validator requirements
*   Voting mechanisms
*   Energy Impact
*   Throughput (Speed), Security, and Decentralization metrics

## 🛠️ Technology Stack

*   **Core:** HTML5, JavaScript (Vanilla ES6+)
*   **Styling:** CSS3 (Custom Design System with CSS Variables)
*   **Typography:** Google Fonts (`Orbitron`, `Inter`, `Share Tech Mono`)
*   **Visualizations:** HTML5 `<canvas>` for live simulations and SVG for data radar charts.
*   **Theming:** Built-in Light & Dark mode support (`localStorage` integrated).

## 📁 Project Structure

*   `index.html` - The landing page and introduction to Blockchain concepts.
*   `algorithm.html` - Dynamic template page for exploring individual consensus algorithms.
*   `compatibility.html` - The global consensus compatibility matrix page.
*   `comparison.html` - The side-by-side algorithm comparison page.
*   `style.css` - Global stylesheet containing layout rules, component styles, and theme variables.
*   `layout.js` - Handles global UI injections (Navigation, Sidebar, Theme Toggle, Background layers).
*   `data.js` - The central data repository (`ALGOS` array) containing all educational content, metrics, and mappings for the 10 algorithms.
*   `demo.js` - Contains the logic for the interactive educational demos on the algorithm pages.
*   `animations.js` - Contains the `<canvas>` rendering logic for the real-time live simulations.
*   `fix_demo.js` - Patches and updates for demo interactive components.

## 🏃‍♂️ How to Run

Since this project uses plain HTML, CSS, and Vanilla JavaScript, no build process or backend server is required. 

1. Clone or download the repository.
2. Open `index.html` directly in any modern web browser.
3. For the best experience, a local development server (like VS Code Live Server) is recommended to ensure all local assets and scripts load without CORS restrictions.

## 🎓 Educational Purpose

This project is built explicitly as an **educational explorer**. The consensus data, performance metrics, and simulations are simplified for teaching purposes to help students and developers visualize complex distributed systems.
