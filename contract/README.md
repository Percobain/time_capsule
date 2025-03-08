# Time Capsule Smart Contract

A decentralized time capsule smart contract built on Nibiru Chain that allows users to store messages and assets that can only be accessed after a specified time period.

## Overview

This smart contract leverages several cutting-edge blockchain technologies:

- **CosmWasm** - A smart contracting platform built for the Cosmos ecosystem that enables WebAssembly (Wasm) smart contracts. CosmWasm provides a secure, lightweight, and efficient environment for executing smart contracts while maintaining cross-chain compatibility.

- **WebAssembly (Wasm)** - A binary instruction format designed for stack-based virtual machines. Wasm enables high-performance execution of code in web browsers and blockchain environments with near-native speed, security, and platform independence.

- **Rust** - Systems programming language that powers the contract logic, offering memory safety, thread safety, and zero-cost abstractions.

- **Nibiru Chain** - A multi-VM blockchain platform in the Cosmos ecosystem that supports both Cosmos SDK and Ethereum Virtual Machine (EVM) environments. Nibiru enables developers to deploy both CosmWasm and Solidity smart contracts on the same chain, offering greater flexibility and interoperability.

## Features

- Create time-locked capsules containing messages
- Set unlock time for each capsule (use [Epoch Converter](https://www.epochconverter.com/) for timestamp conversion)
- View capsule status and metadata
- Retrieve capsule contents after unlock time
- Owner-only content management

## Contract Details

- **Contract Address**: nibi1puyh8t2ypyj6776ndh5xm43pnwlrzlkx3qgp8lcdpx7rrctdyc7qup0h9z
- **Explorer**: View on [Nibiru Explorer](https://explorer.nibiru.fi/nibiru-testnet-2/cosmwasm/0/transactions?contract=nibi1puyh8t2ypyj6776ndh5xm43pnwlrzlkx3qgp8lcdpx7rrctdyc7qup0h9z)

## Development Setup

1. Install Rust:
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Install required cargo tools:
```sh 
cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-script
```

3. Clone and build:
```sh
git clone https://github.com/percobain/time_capsule
cd time_capsule
cargo build
```

## Testing

Run unit tests:
```sh
cargo test
```

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## References

- [CosmWasm Documentation](https://docs.cosmwasm.com)
- [Nibiru Chain Documentation](https://docs.nibiru.fi/)
- [Rust Documentation](https://doc.rust-lang.org/)

