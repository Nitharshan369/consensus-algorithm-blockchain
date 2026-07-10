# Consensus Algorithm Blockchain

A simple blockchain implementation demonstrating how consensus algorithms maintain consistency across distributed nodes. This project focuses on the core concepts of blockchain architecture, block validation, chain verification, and decentralized consensus, making it suitable for learning and experimentation.

---

## Overview

Blockchain networks require all participating nodes to agree on a single valid version of the ledger. This agreement is achieved through a **consensus algorithm**, which ensures data integrity, prevents double-spending, and maintains trust without relying on a centralized authority.

This project provides an educational implementation of blockchain fundamentals and demonstrates how consensus is used to resolve conflicts between competing chains.

---

## Features

- Blockchain creation and management
- Block generation with cryptographic hashing
- Chain validation
- Consensus mechanism implementation
- Conflict resolution between blockchain nodes
- Distributed ledger simulation
- Educational and modular codebase

---

## Project Structure

```
.
├── blockchain/
│   ├── ...
├── node/
│   ├── ...
├── utils/
│   ├── ...
├── requirements.txt
├── main.py
└── README.md
```

> *The structure above may vary depending on the project implementation.*

---

## Technologies Used

- Python
- SHA-256 Cryptographic Hashing
- REST APIs (if applicable)
- JSON
- Flask (if applicable)

---

## Blockchain Workflow

1. A transaction is created.
2. The transaction is added to the list of pending transactions.
3. A new block is generated.
4. The block references the hash of the previous block.
5. The block is validated.
6. Consensus ensures all nodes agree on the correct blockchain.
7. The validated block is appended to the chain.

---

## Consensus Mechanism

The project demonstrates a consensus algorithm used to maintain consistency across distributed nodes.

The consensus process generally includes:

- Verifying the integrity of incoming chains.
- Comparing competing chains.
- Selecting the valid chain according to the implemented consensus rule.
- Updating the local blockchain when a better valid chain is found.

This prevents inconsistencies and ensures that every node eventually reaches agreement on the blockchain state.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Nitharshan369/consensus-algorithm-blockchain.git
```

Move into the project directory:

```bash
cd consensus-algorithm-blockchain
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
python main.py
```

---

## Learning Objectives

This project helps understand:

- Blockchain architecture
- Distributed systems
- Consensus algorithms
- Cryptographic hashing
- Block validation
- Chain verification
- Decentralized networks

---

## Possible Improvements

Future enhancements may include:

- Proof of Stake (PoS)
- Practical Byzantine Fault Tolerance (PBFT)
- Raft Consensus
- Peer-to-peer networking
- Digital signatures
- Transaction pool
- Wallet implementation
- Smart contracts
- Mining rewards
- Web interface
- Docker support
- Unit testing

---

## Applications

This project can serve as a reference for:

- Blockchain coursework
- Distributed Systems laboratories
- Consensus algorithm demonstrations
- Academic projects
- Blockchain fundamentals
- Software engineering experiments

---

## Contributing

Contributions are welcome.

If you would like to improve the project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author

**Nitharshan Krishnamurthi**
**Prasanna B**

GitHub: https://github.com/Nitharshan369
GitHub: https://github.com/Prasanna-Balakrishnan
