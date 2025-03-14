# Time Capsule

A decentralized time capsule application built on Nibiru Chain that allows users to store messages and assets that can only be accessed after a specified time period.

[Try the live demo](https://time-capsule-woad.vercel.app/)

![Time Capsule Demo](frontend/public/timecapsule.gif)

## Architecture

### 1. CosmWasm Smart Contract

The smart contract handles:
- Message storage with time-locking mechanism
- Timestamp validation for unlocking
- State management using cw-storage-plus
- Query and execute message handling

**Core Components:**
- Rust-based contract logic
- CosmWasm framework
- WebAssembly compilation
- Integration tests with cw-multi-test

### 2. Frontend

Modern web application featuring:
- React with TypeScript
- TailwindCSS, Shadcn UI, MagicUI and KokonutUI components
- Leap wallet & Metamask integration
- Nibiru Chain JavaScript SDK (NibiJS)
- Real-time blockchain interaction
- Responsive design

### 3. Deployment on Nibiru Blockchain

- Contract deployed on Nibiru testnet: `nibi1puyh8t2ypyj6776ndh5xm43pnwlrzlkx3qgp8lcdpx7rrctdyc7qup0h9z`
- Frontend hosted on Vercel
- Leap wallet for transaction signing
- Support for Nibiru's testnet environment

## Features

- Create time-locked message capsules
- Set unlock times using epoch timestamps
- View capsule status and metadata
- Retrieve messages after unlock time
- Owner-only message management

## References

- [CosmWasm Docs](https://docs.cosmwasm.com)
- [Nibiru Chain Docs](https://docs.nibiru.fi/)
- [Rust Docs](https://doc.rust-lang.org/)
