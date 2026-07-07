const ALGOS = [
{
  id:'pow', code:'PoW', name:'Proof of Work',
  mechanism:"Proof of Work is a consensus algorithm where miners compete to solve a difficult mathematical puzzle using computational power. The first miner to solve the puzzle earns the right to create the next block and receives a reward. The 'work' refers to the large amount of computation required to solve the puzzle.",
  explain:"Imagine 100 students solving the same extremely difficult math problem. Everyone starts solving at the same time. The first student who gets the correct answer raises their hand. The teacher checks the answer. If it is correct, that student writes the next page in the class notebook and receives a prize. The math problem is the Proof of Work puzzle, and the prize is the block reward.",
  steps:[
    "Step 1: Users create transactions (e.g. Alice -> Bob). Transactions are broadcast to the network.",
    "Step 2: Transactions enter the Mempool. Every node stores unconfirmed transactions inside the mempool (a waiting room).",
    "Step 3: Miners collect transactions from the mempool and create a candidate block.",
    "Step 4: Miners start solving the puzzle by repeatedly changing the Nonce to find a hash starting with required leading zeros.",
    "Step 5: One miner finds the solution (a valid nonce) and broadcasts the new block to the network.",
    "Step 6: Other nodes verify the block (valid transactions, signatures, PoW difficulty).",
    "Step 7: Block is added to the blockchain and transactions become confirmed.",
    "Step 8: The successful miner receives the block reward and transaction fees."
  ],
  layer:'L1', vizTag:'MINING RACE',
  vizCaption:'Multiple miners hash in parallel — first valid hash under the target wins the block.',
  trilemma:{scal:2, sec:10, dec:10, blockTime:'~10 min (BTC)', tps:'~7 TPS', attack:'51% attack, Sybil attack'},
  
  trilemmaTable: [
    {prop: '🚀 Scalability', rating: '★★☆☆☆ (2/5)', exp: 'Mining takes time and limits throughput. Bitcoin creates a block about every 10 minutes and processes roughly 7 TPS.'},
    {prop: '🔒 Security', rating: '★★★★★ (5/5)', exp: 'Extremely secure because attacking the network requires enormous computational power and energy.'},
    {prop: '🌐 Decentralization', rating: '★★★★★ (5/5)', exp: 'Anyone with suitable mining hardware can participate without needing permission.'}
  ],
  trilemmaSummary: 'PoW strongly favors <b>security and decentralization</b>, but sacrifices <b>speed and scalability</b>.',

  performance: { tps: "7 TPS", blockTime: "10 minutes", finality: "Probabilistic (~6 confirmations)", energy: "High electricity consumption", latency: "High" },
  pros: ["Very high security", "Proven reliability over many years", "Highly decentralized", "Resistant to Sybil attacks", "Difficult to alter historical blocks"],
  cons: ["High electricity consumption", "Expensive mining hardware required", "Low transaction throughput", "Long confirmation times", "Mining power can become concentrated in large mining pools"],
  chains:[
    {name:'Bitcoin (BTC)', why:'Prioritizes maximum security, immutability, and decentralization.', lang:'Bitcoin Script'},
    {name:'Litecoin (LTC)', why:'Faster block generation while retaining PoW security.', lang:'Bitcoin Script'},
    {name:'Dogecoin (DOGE)', why:'Uses PoW with merged mining to enhance security.', lang:'Bitcoin Script'},
    {name:'Monero (XMR)', why:'Optimized for privacy and CPU-friendly mining.', lang:'No general-purpose smart contracts'},
    {name:'Kaspa (KAS)', why:'Uses PoW with a blockDAG design for higher throughput.', lang:'Limited / evolving smart contract support'}
  ],
  smartContracts: [
    {chain: 'Bitcoin', lang: 'Bitcoin Script', rel: 'A simple scripting language focused on secure payments.'},
    {chain: 'Litecoin', lang: 'Bitcoin Script', rel: 'Similar scripting model inherited from Bitcoin.'},
    {chain: 'Dogecoin', lang: 'Bitcoin Script', rel: 'Limited scripting functionality.'},
    {chain: 'Monero', lang: 'No general-purpose smart contracts', rel: 'Focuses on privacy rather than programmable contracts.'},
    {chain: 'Kaspa', lang: 'Limited / evolving smart contract support', rel: 'Primarily optimized for fast PoW consensus.'}
  ],
  smartContractNote: "<b>Important:</b> The <b>consensus algorithm (PoW)</b> secures the network, while the <b>smart contract language</b> defines how decentralized applications or transaction scripts are written. They are independent but work together on the same blockchain.",

  mappingAdditionalInfo: [
    { title: "Why Litecoin Has Faster Block Generation", text: "Although Litecoin uses <b>Proof of Work (PoW)</b> like Bitcoin, it is designed with a <b>2.5-minute block time</b> instead of Bitcoin's <b>10-minute block time</b>. The network adjusts the mining difficulty so blocks are found more frequently, resulting in faster transaction confirmations." },
    { title: "CPU-Friendly Mining (Monero)", text: "<b>CPU-friendly mining</b> means the blockchain is designed so that ordinary computer processors (CPUs) can mine efficiently. Monero uses the <b>RandomX</b> algorithm, which reduces the advantage of specialized ASIC mining machines, making mining more decentralized and accessible." },
    { title: "Merged Mining (Dogecoin)", text: "<b>Merged mining</b> allows a miner to use the same computational work to secure <b>two compatible blockchains simultaneously</b>. Dogecoin uses merged mining with Litecoin, enabling Litecoin miners to mine Dogecoin at the same time, increasing Dogecoin's security without requiring additional mining effort." },
    { title: "BlockDAG (Kaspa)", text: "A <b>BlockDAG (Directed Acyclic Graph)</b> is an alternative ledger structure where <b>multiple blocks can be created and accepted in parallel</b>, instead of forming a single linear chain. This reduces wasted mining work, increases transaction throughput, and enables faster block processing while still using Proof of Work for security." }
  ],
  layerClassification: {
    layer: 'Layer 1',
    description: 'All major PoW blockchains are Layer 1 blockchains. A Layer 1 blockchain is the base blockchain that directly validates transactions, reaches consensus, and stores the ledger.',
    examples: ['Bitcoin', 'Litecoin', 'Dogecoin', 'Monero', 'Kaspa'],
    whyNotLayer2: 'Layer 2 solutions (such as payment or scaling networks) operate on top of a Layer 1 blockchain and rely on the Layer 1 network for final security.'
  },
  compatibility: [
    {name:'Bitcoin', consensus:'PoW', compatible:true},
    {name:'Litecoin', consensus:'PoW', compatible:true},
    {name:'Dogecoin', consensus:'PoW', compatible:true},
    {name:'Monero', consensus:'PoW', compatible:true},
    {name:'Kaspa', consensus:'PoW', compatible:true},
    {name:'Ethereum', consensus:'PoS', compatible:false},
    {name:'Cardano', consensus:'PoS', compatible:false},
    {name:'Solana', consensus:'PoH + PoS', compatible:false},
    {name:'EOS', consensus:'DPoS', compatible:false},
    {name:'Hyperledger Fabric', consensus:'PBFT', compatible:false}
  ],
  summary: { mining: "Yes", validators: "Miners", voting: "No", speed: "Low", security: "Excellent", decentralization: "High" },
  takeaway: "<b>Proof of Work (PoW)</b> secures a blockchain by requiring miners to solve computational puzzles. It is one of the oldest and most battle-tested consensus algorithms, offering exceptional <b>security</b> and <b>decentralization</b> at the cost of <b>speed</b>, <b>scalability</b>, and <b>energy efficiency</b>."
},
{
  id:'pos', code:'PoS', name:'Proof of Stake',
  mechanism:"Proof of Stake (PoS) is a consensus algorithm where <b>validators lock (stake) their cryptocurrency as collateral</b> to earn the right to validate transactions and create new blocks. Instead of competing with computing power, validators are selected based on the amount of cryptocurrency they have staked and other network rules.",
  explain:"Imagine a <b>club election</b> where members deposit a security amount before becoming eligible to supervise an event. Members who deposit (stake) money become eligible. One member is chosen to supervise the event. If they perform honestly, they receive a reward. If they cheat, part of their deposit is taken away. Similarly, in PoS, validators <b>stake coins</b>, validate blocks, earn rewards for honest behavior, and risk losing their stake if they act maliciously.",
  steps:[
    "Step 1: Users create transactions (e.g. Alice -> Bob).",
    "Step 2: Transactions enter the mempool until they are selected.",
    "Step 3: Participants lock a certain amount of cryptocurrency to become validators.",
    "Step 4: The network selects a validator to create the next block based on staked amount and protocol rules.",
    "Step 5: The selected validator verifies transactions, creates the new block, and broadcasts it.",
    "Step 6: Other validators verify the block (valid transactions, no double spending, correct signatures).",
    "Step 7: If most validators approve, consensus is reached and the block is added to the blockchain.",
    "Step 8: Honest validators receive rewards; dishonest validators may lose part of their staked coins (slashing)."
  ],
  layer:'L1', vizTag:'WEIGHTED LOTTERY',
  vizCaption:'Bigger stake = bigger slice of the lottery wheel = higher chance of being picked.',
  trilemma:{scal:8, sec:8, dec:8, blockTime:'~12 sec (Ethereum)', tps:'Higher than PoW', attack:'Long-range / stake-grinding attacks'},
  
  trilemmaTable: [
    {prop: '🚀 Scalability', rating: '★★★★☆ (4/5)', exp: 'Faster block creation and higher TPS than PoW because no mining puzzles need to be solved.'},
    {prop: '🔒 Security', rating: '★★★★☆ (4/5)', exp: 'Secure through economic incentives. Validators risk losing their stake (slashing) if they behave dishonestly.'},
    {prop: '🌐 Decentralization', rating: '★★★★☆ (4/5)', exp: 'Anyone with the required stake can participate, though large stakeholders may have more influence.'}
  ],
  trilemmaSummary: 'PoS provides a balanced approach, offering <b>better scalability and energy efficiency than PoW</b> while maintaining strong security and decentralization.',

  performance: { tps: "High (Depends on protocol)", blockTime: "A few seconds (e.g., 12s on Ethereum)", finality: "Fast (e.g., 1 epoch)", energy: "Very low energy consumption", latency: "Low" },
  pros: ["Energy-efficient (no intensive mining required).", "Faster block creation and transaction confirmation.", "Lower hardware requirements.", "Supports high transaction throughput.", "Validators are financially motivated to behave honestly."],
  cons: ["Wealthier participants may have greater influence due to larger stakes.", "Slashing can result in the loss of staked funds if validators misbehave.", "Requires users to lock up their cryptocurrency to participate.", "Different PoS networks use different validator selection rules, making implementations more complex."],
  chains:[
    {name:'Ethereum (ETH)', why:'Reduces energy consumption while supporting smart contracts and decentralized applications.', lang:'Solidity, Vyper'},
    {name:'Cardano (ADA)', why:'Uses PoS to achieve scalability, security, and scientific protocol design.', lang:'Plutus (Haskell), Marlowe'},
    {name:'Polkadot (DOT)', why:'Enables secure interoperability between multiple blockchains through staking.', lang:'Rust (Substrate), Ink!'},
    {name:'Avalanche (AVAX)', why:'Provides high-speed transactions with low latency and strong security.', lang:'Solidity'},
    {name:'Tezos (XTZ)', why:'Supports on-chain governance and energy-efficient block validation.', lang:'Michelson, SmartPy, LIGO'}
  ],
  smartContracts: [
    {chain: 'Ethereum', lang: 'Solidity, Vyper', rel: 'PoS secures the network while smart contracts run on the Ethereum Virtual Machine (EVM).'},
    {chain: 'Cardano', lang: 'Plutus (Haskell), Marlowe', rel: 'PoS provides secure validation for Cardano\'s smart contracts.'},
    {chain: 'Polkadot', lang: 'Rust (Substrate), Ink!', rel: 'PoS secures parachains and smart contract execution.'},
    {chain: 'Avalanche', lang: 'Solidity', rel: 'Supports EVM-compatible smart contracts with PoS consensus.'},
    {chain: 'Tezos', lang: 'Michelson, SmartPy, LIGO', rel: 'PoS secures programmable smart contracts and on-chain upgrades.'}
  ],
  smartContractNote: "<b>Note:</b> The consensus algorithm secures the blockchain, while the smart contract language is used to develop decentralized applications.",

  layerClassification: {
    layer: 'Layer 1',
    description: 'All the major PoS blockchains listed above are <b>Layer 1 blockchains</b>. A Layer 1 blockchain is the main blockchain responsible for validating transactions, reaching consensus, maintaining the ledger, and executing smart contracts.',
    examples: ['Ethereum', 'Cardano', 'Polkadot', 'Avalanche', 'Tezos'],
    whyNotLayer2: 'Layer 2 networks operate on top of these Layer 1 blockchains for scaling.'
  },
  compatibility: [
    {name:'Ethereum', consensus:'PoS', compatible:true},
    {name:'Cardano', consensus:'PoS', compatible:true},
    {name:'Polkadot', consensus:'PoS', compatible:true},
    {name:'Avalanche', consensus:'PoS', compatible:true},
    {name:'Tezos', consensus:'PoS', compatible:true},
    {name:'Bitcoin', consensus:'PoW', compatible:false},
    {name:'Litecoin', consensus:'PoW', compatible:false},
    {name:'Solana', consensus:'PoH + PoS', compatible:false},
    {name:'EOS', consensus:'DPoS', compatible:false},
    {name:'Hyperledger Fabric', consensus:'PBFT', compatible:false}
  ],
  summary: { mining: "No", validators: "Yes", voting: "No", speed: "High", security: "Very High", decentralization: "High" },
  mappingAdditionalInfo: [
    { title: "Interoperability", text: "<b>Interoperability</b> is the ability of different blockchains to <b>communicate, exchange data, and transfer digital assets</b> with one another. It enables seamless interaction between independent blockchain networks without requiring a centralized intermediary." },
    { title: "On-Chain Governance", text: "<b>On-chain governance</b> is a decision-making system where <b>token holders can vote on proposals</b>, such as protocol upgrades or rule changes. Once a proposal is approved, the blockchain automatically implements the changes according to the voting outcome." },
    { title: "Ethereum Virtual Machine (EVM)", text: "The <b>Ethereum Virtual Machine (EVM)</b> is the runtime environment that <b>executes smart contracts on Ethereum and other EVM-compatible blockchains</b>. It ensures that smart contracts run consistently and securely on every network node." },
    { title: "Smart Contract", text: "A <b>smart contract</b> is a <b>self-executing program stored on a blockchain</b>. It automatically performs predefined actions when specific conditions are met, eliminating the need for intermediaries and ensuring transparent, tamper-resistant execution." },
    { title: "EVM Smart Contract", text: "An <b>EVM smart contract</b> is a smart contract designed to run on the <b>Ethereum Virtual Machine (EVM)</b>. These contracts are commonly written in <b>Solidity</b> or <b>Vyper</b> and can be deployed on Ethereum and other EVM-compatible blockchains such as Polygon, Avalanche, BNB Chain, Arbitrum, and Optimism." },
    { title: "Relay Chain", text: "The <b>Relay Chain</b> is the <b>central blockchain of the Polkadot network</b>. It is responsible for <b>providing security, coordinating communication between parachains, validating transactions, and maintaining network consensus</b>. The Relay Chain does not support complex smart contracts; instead, it focuses on network coordination and shared security." },
    { title: "Parachain", text: "A <b>parachain</b> is an <b>independent Layer 1 blockchain connected to the Polkadot Relay Chain</b>. Each parachain can have its own consensus rules, tokens, and applications while benefiting from the Relay Chain's shared security. Multiple parachains operate in parallel, enabling higher scalability and interoperability across the Polkadot ecosystem." }
  ],
  takeaway: "<b>Proof of Stake (PoS)</b> is a consensus algorithm that replaces energy-intensive mining with <b>staking</b>. Validators lock their cryptocurrency to participate in block validation, earning rewards for honest behavior and risking penalties for malicious actions. Compared to PoW, PoS offers <b>higher scalability, lower energy consumption, and faster transaction processing</b> while maintaining strong security through economic incentives."
},
{
  id:'dpos', code:'DPoS', name:'Delegated Proof of Stake',
  mechanism:"<b>Delegated Proof of Stake (DPoS)</b> is a consensus algorithm in which <b>token holders vote to elect a small group of trusted validators (called delegates or witnesses)</b>. These elected delegates are responsible for validating transactions, creating new blocks, and maintaining the blockchain. Unlike Proof of Stake (PoS), where many validators can participate directly, DPoS relies on <b>community voting</b> to select a limited number of validators, making the network faster and more efficient.",
  explain:"Imagine a <b>school election</b>. Every student has one vote. Students elect a few class representatives. The elected representatives are responsible for organizing events and making decisions for the class. If a representative does not perform well, students can vote them out and elect someone else. Similarly, in DPoS, <b>token holders vote for delegates</b>, who validate transactions and create new blocks on behalf of the network.",
  steps:[
    "Step 1: Users create transactions (e.g. Alice -> Bob).",
    "Step 2: Transactions enter the mempool until they are processed.",
    "Step 3: Users stake or hold tokens and vote for trusted delegates. The delegates with the highest votes are elected.",
    "Step 4: The elected delegates take turns producing new blocks in a predetermined order. (No mathematical puzzles).",
    "Step 5: Other delegates verify the block (valid transactions, no double spending, correct signatures).",
    "Step 6: If the majority of delegates approve, consensus is reached and the block is added to the blockchain.",
    "Step 7: The delegate who creates the block receives the reward, and may share a portion with users who voted for them.",
    "Step 8: If a delegate misbehaves, token holders can remove their votes and elect a new delegate."
  ],
  layer:'L1', vizTag:'DELEGATE ROTATION',
  vizCaption:'Voters back delegates; the elected set produces blocks in a round-robin turn order.',
  trilemma:{scal:10, sec:8, dec:6, blockTime:'~0.5-3 sec', tps:'High throughput', attack:'Cartel / Collusion'},
  
  trilemmaTable: [
    {prop: '🚀 Scalability', rating: '★★★★★ (5/5)', exp: 'A small number of elected delegates enables very fast block production and high TPS.'},
    {prop: '🔒 Security', rating: '★★★★☆ (4/5)', exp: 'Secure as long as the majority of delegates act honestly, but collusion among delegates is a potential risk.'},
    {prop: '🌐 Decentralization', rating: '★★★☆☆ (3/5)', exp: 'Only a limited number of delegates validate blocks, making it less decentralized than PoW and PoS.'}
  ],
  trilemmaSummary: 'DPoS prioritizes <b>high scalability and fast transaction processing</b>, while sacrificing some decentralization because only a small group of elected delegates participate in consensus.',

  performance: { tps: "Very High (Thousands)", blockTime: "Very Fast (e.g., 0.5s on EOS)", finality: "Fast", energy: "Very low energy consumption", latency: "Very Low" },
  pros: ["Very high transaction speed and throughput.", "Low energy consumption compared to PoW.", "Fast block confirmation times.", "Community can replace inactive or dishonest delegates through voting.", "Suitable for applications requiring high performance."],
  cons: ["Less decentralized because only a limited number of delegates validate blocks.", "Voting power may become concentrated among large token holders.", "Delegates may collude, reducing network fairness.", "Users who do not vote have little influence over network governance."],
  chains:[
    {name:'EOS (EOS)', why:'Uses elected block producers to achieve high throughput and low transaction latency.', lang:'C++ (WebAssembly)'},
    {name:'TRON (TRX)', why:'Elects Super Representatives to validate blocks and process transactions efficiently.', lang:'Solidity'},
    {name:'BitShares (BTS)', why:'Designed for fast decentralized financial services using elected delegates.', lang:'Limited'},
    {name:'Lisk (LSK)', why:'Uses delegates to provide efficient blockchain governance and application hosting.', lang:'JavaScript, TypeScript'},
    {name:'Steem (Legacy)', why:'Used DPoS to support fast content publishing and social media transactions.', lang:'C++'}
  ],
  smartContracts: [
    {chain: 'EOS', lang: 'C++ (WebAssembly)', rel: 'DPoS secures the network while WebAssembly executes smart contracts.'},
    {chain: 'TRON', lang: 'Solidity', rel: 'DPoS secures the network and supports EVM-compatible smart contracts.'},
    {chain: 'Lisk', lang: 'JavaScript, TypeScript', rel: 'DPoS secures decentralized applications developed using JavaScript technologies.'},
    {chain: 'BitShares', lang: 'Limited smart contract support', rel: 'Primarily designed for decentralized exchange functionality.'}
  ],
  smartContractNote: "<b>Note:</b> DPoS determines <b>who validates blocks</b>, while the smart contract language determines <b>how decentralized applications are developed</b>.",

  layerClassification: {
    layer: 'Layer 1',
    description: 'The major DPoS blockchains are <b>Layer 1 blockchains</b>. A Layer 1 blockchain is the primary blockchain responsible for validating transactions, reaching consensus, maintaining the blockchain ledger, and executing smart contracts (where supported).',
    examples: ['EOS', 'TRON', 'Lisk', 'BitShares'],
    whyNotLayer2: 'Layer 2 networks operate on top of these Layer 1 blockchains for scaling.'
  },
  compatibility: [
    {name:'EOS', consensus:'DPoS', compatible:true},
    {name:'TRON', consensus:'DPoS', compatible:true},
    {name:'Lisk', consensus:'DPoS', compatible:true},
    {name:'BitShares', consensus:'DPoS', compatible:true},
    {name:'Bitcoin', consensus:'PoW', compatible:false},
    {name:'Ethereum', consensus:'PoS', compatible:false},
    {name:'Cardano', consensus:'PoS', compatible:false},
    {name:'Solana', consensus:'PoH + PoS', compatible:false},
    {name:'Hyperledger Fabric', consensus:'PBFT', compatible:false}
  ],
  summary: { mining: "No", validators: "Yes", voting: "Yes", speed: "Very High", security: "High", decentralization: "Medium" },
  mappingAdditionalInfo: [
    { title: "WebAssembly (Wasm)", text: "<b>WebAssembly (Wasm)</b> is a <b>high-performance binary instruction format</b> that allows programs written in languages such as <b>C, C++, and Rust</b> to run <b>quickly and securely</b> on different platforms. In blockchain, WebAssembly is used as a <b>runtime environment</b> for executing smart contracts with better speed and efficiency than traditional interpreted code. <b>Example:</b> EOS and Polkadot use WebAssembly to execute smart contracts efficiently." }
  ],
  takeaway: "<b>Delegated Proof of Stake (DPoS)</b> is a consensus algorithm where <b>token holders elect a small group of delegates to validate transactions and create blocks</b>. By reducing the number of validators, DPoS achieves <b>very high scalability, fast transaction processing, and low energy consumption</b>, but it offers <b>less decentralization</b> than PoW and PoS due to its reliance on a limited number of elected delegates."
},
{
  id:'poa', code:'PoA', name:'Proof of Authority',
  mechanism:"<b>Proof of Authority (PoA)</b> is a consensus algorithm in which <b>a small group of pre-approved and trusted validators</b> are responsible for validating transactions and creating new blocks. Instead of relying on computational power (PoW) or staked cryptocurrency (PoS), PoA relies on the <b>identity and reputation of validators</b>. Validators are known, verified entities whose authority is trusted by the network.",
  explain:"Imagine a <b>bank</b> where only <b>authorized employees</b> are allowed to approve transactions. Customers submit transactions. Authorized employees verify them. Once approved, the transactions are recorded. Unknown people cannot approve transactions. Similarly, in PoA, <b>only approved validators</b> can create and validate blocks.",
  steps:[
    "Step 1: Users submit transactions to the blockchain (e.g. Alice -> Bob).",
    "Step 2: Transactions are broadcast and stored in the mempool.",
    "Step 3: Only the approved validators collect pending transactions from the mempool.",
    "Step 4: One of the authorized validators is selected (or follows a predefined rotation) to create the next block. (No mining, no staking).",
    "Step 5: Other validators verify that transactions are valid, no double spending, and the block follows network rules.",
    "Step 6: If the required number of validators approve, consensus is reached and the block is added.",
    "Step 7: The next authorized validator creates the following block according to schedule."
  ],
  layer:'L1', vizTag:'AUTHORITY ROTATION',
  vizCaption:'Known, pre-approved validators sign blocks in turn — identity is the collateral.',
  trilemma:{scal:10, sec:8, dec:4, blockTime:'~1-5 sec', tps:'High throughput', attack:'Compromised identities'},
  
  trilemmaTable: [
    {prop: '🚀 Scalability', rating: '★★★★★ (5/5)', exp: 'Very fast block creation and high TPS because only a few trusted validators participate.'},
    {prop: '🔒 Security', rating: '★★★★☆ (4/5)', exp: 'Secure in permissioned networks, as validators are verified identities. However, compromising a few validators can affect the network.'},
    {prop: '🌐 Decentralization', rating: '★★☆☆☆ (2/5)', exp: 'Limited decentralization since only selected validators can participate in consensus.'}
  ],
  trilemmaSummary: 'PoA prioritizes <b>high scalability and efficiency</b> by relying on a small number of trusted validators, but this comes at the cost of lower decentralization.',

  performance: { tps: "Very High (Thousands)", blockTime: "Very Fast (Often 1-5 seconds)", finality: "Fast", energy: "Extremely low energy consumption", latency: "Very Low" },
  pros: ["Very fast block generation and high transaction throughput.", "Low energy consumption since mining is not required.", "Simple and efficient consensus mechanism.", "Ideal for private and enterprise blockchain networks.", "Predictable performance with low transaction costs."],
  cons: ["Less decentralized because only approved validators can participate.", "Relies heavily on trust in validator identities.", "Not suitable for fully permissionless public blockchain networks.", "If several validators act maliciously or are compromised, network security may be affected."],
  chains:[
    {name:'VeChainThor (VET)', why:'Uses trusted Authority Masternodes to provide fast, reliable transactions for enterprise applications.', lang:'Solidity'},
    {name:'Ethereum Goerli (Legacy)', why:'Used PoA to provide fast and stable testing without mining costs.', lang:'Solidity, Vyper'},
    {name:'Ethereum Kovan (Legacy)', why:'Used PoA for efficient smart contract development and testing.', lang:'Solidity, Vyper'},
    {name:'POA Network (POA)', why:'Designed specifically to demonstrate the Proof of Authority consensus model.', lang:'Solidity'},
    {name:'Polygon Edge (Private)', why:'Uses PoA for enterprise and private blockchain deployments requiring high performance.', lang:'Solidity'}
  ],
  smartContracts: [
    {chain: 'VeChainThor', lang: 'Solidity', rel: 'PoA secures the network while Solidity is used to develop smart contracts.'},
    {chain: 'POA Network', lang: 'Solidity', rel: 'Uses the Ethereum Virtual Machine (EVM) with PoA consensus.'},
    {chain: 'Polygon Edge', lang: 'Solidity', rel: 'Supports EVM-compatible smart contracts secured by PoA validators.'},
    {chain: 'Ethereum Goerli / Kovan', lang: 'Solidity, Vyper', rel: 'Test networks for developing and testing Ethereum smart contracts using PoA.'}
  ],
  smartContractNote: "<b>Note:</b> PoA determines <b>who validates blocks</b>, while the smart contract language defines <b>how decentralized applications are programmed</b>.",

  layerClassification: {
    layer: 'Layer 1',
    description: 'Most PoA blockchains are <b>Layer 1 blockchains</b>. A Layer 1 blockchain is responsible for validating transactions, maintaining the blockchain ledger, reaching consensus, and executing smart contracts.',
    examples: ['VeChainThor', 'POA Network'],
    whyNotLayer2: 'Some enterprise solutions, such as <b>Polygon Edge</b>, also allow PoA-based private blockchain deployments.'
  },
  compatibility: [
    {name:'VeChainThor', consensus:'PoA', compatible:true},
    {name:'POA Network', consensus:'PoA', compatible:true},
    {name:'Polygon Edge (PoA Mode)', consensus:'PoA', compatible:true},
    {name:'Bitcoin', consensus:'PoW', compatible:false},
    {name:'Ethereum', consensus:'PoS', compatible:false},
    {name:'EOS', consensus:'DPoS', compatible:false},
    {name:'Solana', consensus:'PoH + PoS', compatible:false},
    {name:'Hyperledger Fabric', consensus:'PBFT', compatible:false}
  ],
  summary: { mining: "No", validators: "Yes", voting: "No", speed: "Very High", security: "High", decentralization: "Low" },
  mappingAdditionalInfo: [
    { title: "Solidity", text: "<b>Solidity</b> is a <b>high-level programming language</b> used to write <b>smart contracts</b> for Ethereum and other <b>EVM-compatible blockchains</b>. It enables developers to build decentralized applications (DApps) and automate blockchain transactions." },
    { title: "Masternode", text: "A <b>Masternode</b> is a <b>special validator node</b> that performs important network functions such as <b>validating transactions, creating blocks, and maintaining blockchain operations</b>. In Proof of Authority (PoA), masternodes are <b>trusted, pre-approved validators</b> responsible for securing the network and reaching consensus." }
  ],
  takeaway: "<b>Proof of Authority (PoA)</b> is a consensus algorithm where <b>pre-approved, trusted validators create and validate blocks based on their identity and reputation rather than computational power or staked cryptocurrency</b>. It offers <b>high scalability, fast transaction processing, and low energy consumption</b>, making it well suited for <b>private, consortium, and enterprise blockchains</b>, while sacrificing decentralization compared to PoW and PoS."
},
{
  id:'poh', code:'PoH', name:'Proof of History',
  mechanism:"<b>Proof of History (PoH)</b> is a consensus mechanism that creates a <b>cryptographic record of time</b>, allowing the blockchain to prove <b>when transactions occurred</b> before they are processed. Instead of validators spending time agreeing on the order of transactions, PoH provides a verifiable timestamp that enables transactions to be processed more quickly.<br><br><b>Note:</b> PoH is <b>not a standalone consensus algorithm</b>. It is used together with <b>Proof of Stake (PoS)</b> in Solana. PoH provides the transaction ordering, while PoS is responsible for selecting validators and securing the network.",
  explain:"Imagine a <b>race</b> where every runner receives a numbered token as they cross the starting line. Runner A receives Token #1, Runner B receives Token #2, etc. Since the tokens are issued in order, everyone knows exactly who started first without needing to ask others. Similarly, PoH creates a cryptographic timestamp so every validator knows the exact order of transactions.",
  steps:[
    "Step 1: Users submit transactions to the blockchain (e.g. Alice -> Bob).",
    "Step 2: Each transaction is assigned a cryptographic timestamp using a continuous cryptographic hashing process.",
    "Step 3: The timestamps automatically determine the correct order of transactions. Validators do not need to spend extra time agreeing on the sequence.",
    "Step 4: A validator selected through Proof of Stake (PoS) collects the ordered transactions and creates a new block.",
    "Step 5: Other validators verify transaction order, digital signatures, no double spending, and block validity.",
    "Step 6: Once validators approve the block, consensus is reached and the block is added.",
    "Step 7: The validator receives staking rewards and transaction fees."
  ],
  layer:'L1', vizTag:'VERIFIABLE CLOCK',
  vizCaption:'A continuous self-referencing hash chain timestamps events before PoS voting confirms them.',
  trilemma:{scal:10, sec:8, dec:6, blockTime:'~400 ms slots', tps:'Very High', attack:'Time manipulation'},
  
  trilemmaTable: [
    {prop: '🚀 Scalability', rating: '★★★★★ (5/5)', exp: 'Cryptographic timestamps eliminate the need for validators to repeatedly agree on transaction order, enabling extremely high TPS.'},
    {prop: '🔒 Security', rating: '★★★★☆ (4/5)', exp: 'Combined with PoS, PoH provides strong security through cryptographic ordering and validator verification.'},
    {prop: '🌐 Decentralization', rating: '★★★☆☆ (3/5)', exp: 'Running a validator requires powerful hardware, which may limit participation compared to PoW or traditional PoS networks.'}
  ],
  trilemmaSummary: 'PoH focuses on <b>very high scalability and fast transaction ordering</b>, while maintaining strong security through PoS. However, the higher hardware requirements reduce decentralization.',

  performance: { tps: "Very High (Thousands)", blockTime: "Very Fast (~400 milliseconds)", finality: "Fast", energy: "Low energy consumption", latency: "Very Low" },
  pros: ["Extremely fast transaction ordering.", "Very high transaction throughput (TPS).", "Low transaction fees.", "Reduces the time validators spend reaching agreement on transaction order.", "Well suited for high-performance decentralized applications."],
  cons: ["Not a standalone consensus algorithm; it relies on PoS for validator selection and security.", "Requires powerful hardware to operate validator nodes.", "Primarily associated with Solana, so adoption is limited compared to PoW and PoS.", "Lower decentralization due to higher infrastructure requirements."],
  chains:[
    {name:'Solana (SOL)', why:'Uses PoH with PoS to achieve extremely fast transaction processing and high throughput for decentralized applications.', lang:'Rust, C, C++'}
  ],
  smartContracts: [
    {chain: 'Solana', lang: 'Rust, C, C++', rel: 'PoH provides transaction ordering, while PoS secures the network and smart contracts execute efficiently.'}
  ],
  smartContractNote: "<b>Note:</b> PoH determines <b>when transactions occurred</b>, while the smart contract language defines <b>how decentralized applications are developed</b>.",

  layerClassification: {
    layer: 'Layer 1',
    description: '<b>Solana</b> is a <b>Layer 1 blockchain</b>. A Layer 1 blockchain is responsible for validating transactions, maintaining the blockchain ledger, reaching consensus, and executing smart contracts.',
    examples: ['Solana'],
    whyNotLayer2: 'PoH is one of the key technologies that enables Solana to achieve high throughput at the Layer 1 level without relying on Layer 2 networks.'
  },
  compatibility: [
    {name:'Solana', consensus:'PoH + PoS', compatible:true},
    {name:'Bitcoin', consensus:'PoW', compatible:false},
    {name:'Ethereum', consensus:'PoS', compatible:false},
    {name:'Cardano', consensus:'PoS', compatible:false},
    {name:'EOS', consensus:'DPoS', compatible:false},
    {name:'VeChainThor', consensus:'PoA', compatible:false},
    {name:'Hyperledger Fabric', consensus:'PBFT', compatible:false}
  ],
  summary: { mining: "No", validators: "Yes", voting: "No", speed: "Extremely High", security: "High", decentralization: "Medium" },
  mappingAdditionalInfo: [
    { title: "Solana", text: "<b>Solana</b> is a <b>high-performance Layer 1 blockchain</b> designed to support <b>fast, low-cost, and scalable decentralized applications (DApps) and smart contracts</b>. It combines <b>Proof of History (PoH)</b> with <b>Proof of Stake (PoS)</b> to achieve high transaction throughput and low latency while maintaining network security.<br><br><b>Cryptocurrency:</b> <b>SOL</b><br><b>Smart Contract Language:</b> <b>Rust, C, C++</b><br><b>Consensus:</b> <b>Proof of History (PoH) + Proof of Stake (PoS)</b>" }
  ],
  takeaway: "<b>Proof of History (PoH)</b> is a consensus mechanism that creates a <b>cryptographic record of time</b> to prove the order of transactions before they are validated. By combining <b>PoH for transaction ordering</b> with <b>Proof of Stake (PoS) for validator selection</b>, Solana achieves <b>very high scalability, low latency, and high transaction throughput</b>, making it suitable for high-performance blockchain applications."
},
{
  id:'pbft', code:'PBFT', name:'Practical Byzantine Fault Tolerance',
  mechanism:"<b>Practical Byzantine Fault Tolerance (PBFT)</b> is a consensus algorithm designed to allow distributed systems to reach agreement even when some nodes behave maliciously or fail unexpectedly (known as <b>Byzantine faults</b>). Instead of relying on mining or staking, PBFT uses multiple rounds of communication between trusted validator nodes to agree on the next block.<br><br>PBFT guarantees that all honest nodes reach the same decision as long as <b>less than one-third of the participating nodes are faulty or malicious</b>.<br><br><b>Note:</b> PBFT is commonly used in <b>permissioned (private or consortium) blockchains</b>, where validator identities are known.",
  explain:"Imagine <b>10 judges</b> deciding the winner of a competition. One judge gives incorrect results. Another judge refuses to vote. The remaining judges communicate with each other. If most judges agree on the same winner, that decision becomes final. Similarly, PBFT allows honest nodes to reach consensus even if a few nodes are dishonest or malfunctioning.",
  steps:[
    "Step 1: Users submit transactions to the blockchain.",
    "Step 2: A Primary (Leader) node collects transactions and prepares a proposed block.",
    "Step 3: Pre-Prepare Phase — The Primary broadcasts the proposed block to all other validator nodes.",
    "Step 4: Prepare Phase — Validators check transaction validity and broadcast a 'Prepare' message if valid.",
    "Step 5: Commit Phase — After receiving enough matching Prepare messages, validators send a 'Commit' message.",
    "Step 6: Once enough Commit messages are received, consensus is achieved and the block is added.",
    "Step 7: The system proceeds to the next block. If the Primary is faulty, a 'View Change' elects a new leader."
  ],
  layer:'L1', vizTag:'BYZANTINE VOTING',
  vizCaption:'Three message rounds — pre-prepare, prepare, commit — sweep between all nodes to lock in agreement.',
  trilemma:{scal:7, sec:10, dec:4, blockTime:'Under 1 sec', tps:'Thousands', attack:'Over 1/3 malicious nodes'},
  
  trilemmaTable: [
    {prop: '🚀 Scalability', rating: '★★★☆☆ (3/5)', exp: 'Works efficiently with a limited number of validators, but communication overhead increases rapidly as more nodes join.'},
    {prop: '🔒 Security', rating: '★★★★★ (5/5)', exp: 'Can tolerate Byzantine faults and malicious nodes as long as fewer than one-third of validators are faulty.'},
    {prop: '🌐 Decentralization', rating: '★★☆☆☆ (2/5)', exp: 'Typically used in permissioned networks with a fixed set of known validators, limiting openness.'}
  ],
  trilemmaSummary: 'PBFT provides <b>excellent security and fast finality</b> for permissioned blockchains but sacrifices scalability and decentralization because every validator must communicate with every other validator.',

  performance: { tps: "High (Thousands)", blockTime: "Very Fast (< 1 second)", finality: "Immediate", energy: "Extremely low energy consumption", latency: "Very Low" },
  pros: ["Tolerates malicious (Byzantine) nodes.", "Immediate transaction finality (no confirmation waiting).", "No mining required, resulting in low energy consumption.", "High security for permissioned blockchain networks.", "Fast consensus with low transaction latency."],
  cons: ["Communication overhead increases rapidly as the number of validators grows.", "Not suitable for large public blockchain networks.", "Requires known and authenticated validator identities.", "Lower decentralization compared to PoW and PoS networks.", "Leader (Primary) failures require a View Change process, adding complexity."],
  chains:[
    {name:'Hyperledger Fabric', why:'Uses PBFT-like ordering and consensus in private enterprise networks where validator identities are known.', lang:'None (Enterprise Platform)'},
    {name:'Zilliqa (ZIL)', why:'Uses PBFT within network shards to quickly validate transactions after committee selection.', lang:'Scilla'},
    {name:'Tendermint (Cosmos SDK)', why:'Uses a BFT consensus protocol inspired by PBFT to provide fast and deterministic finality.', lang:'Go (Modules), CosmWasm'}
  ],
  smartContracts: [
    {chain: 'Hyperledger Fabric', lang: 'Go, Java, JavaScript', rel: 'PBFT secures transaction agreement while chaincode implements business logic.'},
    {chain: 'Cosmos (Tendermint)', lang: 'CosmWasm (Rust), Go (Modules)', rel: 'BFT consensus secures the network while smart contracts execute decentralized applications.'},
    {chain: 'Zilliqa', lang: 'Scilla', rel: 'PBFT confirms transactions before smart contracts execute securely.'}
  ],
  smartContractNote: "<b>Note:</b> PBFT determines <b>how validators agree on transactions</b>, while smart contract languages define <b>how blockchain applications are developed</b>.",

  layerClassification: {
    layer: 'Layer 1',
    description: '<b>Hyperledger Fabric</b>, <b>Zilliqa</b>, and <b>Cosmos Hub</b> operate as <b>Layer 1 blockchains</b>. A Layer 1 blockchain is responsible for validating transactions, maintaining the blockchain ledger, reaching consensus, and executing smart contracts.',
    examples: ['Hyperledger Fabric', 'Cosmos Hub'],
    whyNotLayer2: 'PBFT enables these Layer 1 systems to achieve <b>fast transaction finality</b> and <b>high reliability</b> in trusted environments without relying on Layer 2 networks.'
  },
  compatibility: [
    {name:'Hyperledger Fabric', consensus:'PBFT (or PBFT-like)', compatible:true},
    {name:'Zilliqa', consensus:'PBFT + PoW', compatible:true},
    {name:'Cosmos (Tendermint)', consensus:'BFT (PBFT-inspired)', compatible:true},
    {name:'Bitcoin', consensus:'PoW', compatible:false},
    {name:'Ethereum', consensus:'PoS', compatible:false},
    {name:'Solana', consensus:'PoH + PoS', compatible:false},
    {name:'Cardano', consensus:'PoS', compatible:false}
  ],
  summary: { mining: "No", validators: "Yes", voting: "Yes", speed: "Very High", security: "Very High", decentralization: "Low" },
  mappingAdditionalInfo: [
    { title: "Byzantine Faults", text: "A <b>Byzantine fault</b> occurs when one or more nodes in a distributed network behave incorrectly or maliciously, such as sending false information or conflicting messages. A Byzantine Fault Tolerant system can still reach the correct consensus despite these faulty nodes." },
    { title: "Consortium Blockchain", text: "A <b>consortium blockchain</b> is a <b>permissioned blockchain</b> managed by a group of organizations rather than a single entity or the public. Only authorized participants can validate transactions and access the network." },
    { title: "BFT (Byzantine Fault Tolerance)", text: "<b>Byzantine Fault Tolerance (BFT)</b> is the ability of a distributed system to continue operating correctly even if some nodes fail or act maliciously. It ensures that honest nodes can still agree on the correct state of the blockchain." },
    { title: "Chaincode", text: "<b>Chaincode</b> is the term used by <b>Hyperledger Fabric</b> for <b>smart contracts</b>. It contains the business logic that defines how transactions are processed and how assets are managed on the blockchain." }
  ],
  takeaway: "<b>Practical Byzantine Fault Tolerance (PBFT)</b> is a consensus algorithm that enables distributed systems to reach agreement even when some validators are faulty or malicious. By using multiple rounds of communication (<b>Pre-Prepare, Prepare, and Commit</b>), PBFT ensures that all honest validators agree on the same block. It provides <b>strong security, fast finality, and low energy consumption</b>, making it well suited for <b>private, consortium, and enterprise blockchain networks</b>."
},
{
  id:'pospace', code:'PoSp', name:'Proof of Space / Capacity',
  mechanism:"<b>Proof of Space (PoSp)</b> is a consensus algorithm that uses <b>available hard disk storage</b> instead of computing power or staked coins to decide who creates the next block. Before participating, miners fill their storage devices with <b>cryptographic plots</b>. When a new block needs to be created, miners search these stored plots for the best matching proof. The miner with the best proof creates the block and receives the reward.<br><br><b>Note:</b> <b>Proof of Capacity (PoC)</b> is another name for <b>Proof of Space (PoSp)</b>. Both refer to the same consensus mechanism.",
  explain:"Imagine <b>three students</b> each have a different number of answer sheets stored in their lockers. The teacher asks: \"Who has Answer Sheet #582?\" Student A has 100 sheets. Student B has 500 sheets. Student C has 1000 sheets. Student C has a higher chance of finding the required sheet because they have more storage. Similarly, in PoSp, miners with <b>more plotted storage</b> have a higher chance of finding the correct proof and creating the next block.",
  steps:[
    "Step 1: Miner prepares storage (Plotting) — Fills their hard disk with cryptographic plots.",
    "Step 2: Users submit transactions to the network.",
    "Step 3: The blockchain broadcasts a cryptographic challenge to all miners.",
    "Step 4: Miners search their stored plots to find the best matching proof for the challenge.",
    "Step 5: The miner with the best proof collects the transactions and creates a new block.",
    "Step 6: Other nodes verify the proof, transactions, and digital signatures.",
    "Step 7: Once verified, consensus is reached, and the block is added to the blockchain.",
    "Step 8: The winning miner receives the block reward and transaction fees."
  ],
  layer:'L1', vizTag:'DISK PLOT CHALLENGE',
  vizCaption:'Farmers scan pre-written disk plots for the closest match to a random network challenge.',
  trilemma:{scal:8, sec:8, dec:8, blockTime:'~10 mins', tps:'Low (base layer)', attack:'Storage (51% of space)'},
  
  trilemmaTable: [
    {prop: '🚀 Scalability', rating: '★★★★☆ (4/5)', exp: 'Searching pre-generated plots is faster than continuous computation, allowing efficient block creation.'},
    {prop: '🔒 Security', rating: '★★★★☆ (4/5)', exp: 'Security comes from the difficulty of generating valid plots and the amount of storage committed by miners.'},
    {prop: '🌐 Decentralization', rating: '★★★★☆ (4/5)', exp: 'Anyone with available hard disk space can participate without requiring expensive mining hardware.'}
  ],
  trilemmaSummary: 'PoSp provides a balanced approach by replacing energy-intensive mining with storage space, resulting in high energy efficiency while maintaining good scalability, security, and decentralization.',

  performance: { tps: "Low (base layer)", blockTime: "10 minutes (Chia target)", finality: "Probabilistic", energy: "Very low energy consumption", latency: "High" },
  pros: ["Very low energy consumption compared to PoW.", "Uses inexpensive hard disk storage instead of GPUs or ASICs.", "Lower hardware costs for miners.", "Produces less electronic waste.", "More environmentally friendly than traditional mining.", "Provides good decentralization since many users can participate."],
  cons: ["Requires significant storage space to improve mining chances.", "Initial plotting process is time-consuming.", "Large storage providers may gain an advantage.", "Hard drives can wear out after long-term use.", "Adoption is limited compared to PoW and PoS."],
  chains:[
    {name:'Chia Network', why:'Uses Proof of Space with Proof of Time to create an energy-efficient blockchain using storage instead of computation.', lang:'Chialisp'},
    {name:'Signum (formerly Burstcoin)', why:'Uses Proof of Capacity (same as PoSp) where miners dedicate hard disk space instead of processing power.', lang:'Java-based Smart Contracts'}
  ],
  smartContracts: [
    {chain: 'Chia Network', lang: 'Chialisp', rel: 'PoSp determines who creates the next block, while Chialisp is used to build smart contracts.'},
    {chain: 'Signum', lang: 'Java-based Smart Contracts', rel: 'PoSp secures the blockchain while smart contracts implement application logic.'}
  ],
  smartContractNote: "<b>Note:</b> PoSp decides <b>who creates the next block</b>, while the smart contract language defines <b>how decentralized applications are developed</b>.",

  layerClassification: {
    layer: 'Layer 1',
    description: '<b>Chia Network</b> and <b>Signum</b> are <b>Layer 1 blockchains</b>. A Layer 1 blockchain is responsible for validating transactions, maintaining the blockchain ledger, reaching consensus, and executing smart contracts.',
    examples: ['Chia Network', 'Signum'],
    whyNotLayer2: 'PoSp enables these Layer 1 blockchains to achieve <b>energy-efficient consensus</b> by using storage rather than computational power natively at the base layer.'
  },
  compatibility: [
    {name:'Chia Network', consensus:'PoSp + Proof of Time', compatible:true},
    {name:'Signum', consensus:'Proof of Capacity (PoSp)', compatible:true},
    {name:'Bitcoin', consensus:'PoW', compatible:false},
    {name:'Ethereum', consensus:'PoS', compatible:false},
    {name:'Solana', consensus:'PoH + PoS', compatible:false},
    {name:'Cardano', consensus:'PoS', compatible:false},
    {name:'Hyperledger Fabric', consensus:'PBFT', compatible:false}
  ],
  summary: { mining: "Yes (Farming)", validators: "Farmers", voting: "No", speed: "Low", security: "High", decentralization: "High" },
  mappingAdditionalInfo: [
    { title: "Proof of Time (PoT)", text: "<b>Proof of Time (PoT)</b> is <b>not a standalone consensus algorithm</b>. It is a mechanism that proves a <b>specific amount of time has passed</b> before a block is finalized. It works alongside <b>Proof of Space (PoSp)</b> to make block creation more secure and orderly.<br><br><b>Key Points:</b><br>• ⏳ Proves that real time has elapsed.<br>• 🔒 Prevents blocks from being created too quickly.<br>• 🤝 Works together with Proof of Space, not by itself.<br>• 🌱 Used by Chia to ensure fair and secure block creation.<br><br><b>In simple terms:</b> Proof of Space decides <i>who</i> creates the block, while Proof of Time decides <i>when</i> the block can be finalized." }
  ],
  takeaway: "<b>Proof of Space (PoSp)</b>, also known as <b>Proof of Capacity (PoC)</b>, is a consensus algorithm that uses <b>hard disk storage</b> instead of computational power or staked coins to determine who creates the next block. Miners first generate <b>cryptographic plots</b> on their storage devices, then use these plots to respond to network challenges. This approach delivers <b>low energy consumption, lower hardware costs, and strong decentralization</b>, making it an environmentally friendly alternative to traditional blockchain consensus mechanisms."
},
{
  id:'pob', code:'PoB', name:'Proof of Burn',
  mechanism:"Participants send coins to a verifiably unspendable 'eater' address, permanently destroying them. This burned amount acts as a virtual, decaying form of mining power — the more (and more recently) you've burned, the better your chance of producing the next block.",
  steps:[
    "A miner sends coins to a provably unspendable burn address.",
    "The network can verify the transaction is real and irreversible on-chain.",
    "Burned coins convert into 'virtual mining power' that decays over time.",
    "Block-producing rights are awarded proportional to current virtual power.",
    "Because burning has a real cost, it substitutes for wasted electricity or locked stake."
  ],
  layer:'L1', vizTag:'COIN INCINERATION',
  vizCaption:'Coins are sent to an unspendable address; burned value converts into decaying mining power.',
  trilemma:{scal:5, sec:6, dec:6, blockTime:'Varies by chain', tps:'Low-moderate', attack:'Wealth concentration re-burn attack'},
  explain:"An interesting middle ground — costly like PoW (you sacrifice real value) but without ongoing energy draw, though adoption remains niche.",
  performance: { tps: "Low-moderate", blockTime: "Varies", finality: "Probabilistic", energy: "Low", latency: "Medium" },
  pros: ["No energy waste", "Creates scarcity", "Long-term commitment rewarded"],
  cons: ["Wealth favors the rich", "Permanent loss of assets", "Niche adoption"],
  chains:[
    {name:'Slimcoin (SLM)', why:'One of the first chains to implement PoB as its primary consensus, layered atop PoW/PoS elements.', lang:'Script-based'},
    {name:'Counterparty (XCP)', why:'Originally distributed its native token entirely via burning Bitcoin, tying its security to Bitcoin\'s history.', lang:'Custom scripting on Bitcoin'}
  ],
  summary: { mining: "Virtual", validators: "Burners", voting: "No", speed: "Moderate", security: "Moderate", decentralization: "Moderate" }
},
{
  id:'poet', code:'PoET', name:'Proof of Elapsed Time',
  mechanism:"Each participating node requests a random wait time from a trusted hardware enclave (like Intel SGX). Whoever's timer expires first gets to produce the block — like a fair, hardware-verified lottery where cheating the wait time is designed to be practically impossible.",
  steps:[
    "Each node asks a trusted execution environment (TEE) for a random wait duration.",
    "Nodes go idle for their assigned duration — no computation is wasted.",
    "The first node whose timer naturally expires broadcasts its block.",
    "The TEE provides a certificate proving the wait wasn't manipulated.",
    "Other nodes verify the certificate and accept the block if it's genuine."
  ],
  layer:'L1', vizTag:'RANDOM WAIT RACE',
  vizCaption:'Each node gets a hardware-issued random countdown — first to reach zero honestly wins.',
  trilemma:{scal:7, sec:6, dec:5, blockTime:'Variable (seconds)', tps:'Moderate', attack:'Trusted-hardware compromise'},
  explain:"Almost energy-free like PoS, but its fairness depends on trusting specialised hardware manufacturers — a centralisation trade-off of a different kind.",
  performance: { tps: "Moderate", blockTime: "Variable", finality: "Fast", energy: "Very Low", latency: "Medium" },
  pros: ["Fair lottery system", "Energy efficient", "Fast block times"],
  cons: ["Relies on specialized trusted hardware (like Intel SGX)", "Hardware centralization risk", "Not purely permissionless"],
  chains:[
    {name:'Hyperledger Sawtooth', why:'Built by Intel; PoET suits permissioned enterprise networks that can rely on standardised trusted hardware.', lang:'Python, Go, JavaScript, Rust'}
  ],
  summary: { mining: "No", validators: "Nodes with TEE", voting: "No", speed: "High", security: "Moderate", decentralization: "Moderate" }
},
{
  id:'poi', code:'PoI', name:'Proof of Importance',
  mechanism:"Rather than rewarding pure wealth (like naive PoS) or pure hashpower, each account gets an 'importance score' from multiple signals: vested balance, transaction volume, and how connected it is to other active accounts. Higher importance means a higher chance of harvesting the next block.",
  steps:[
    "The network analyses each account's vested balance, recent transaction activity, and network graph position.",
    "These signals combine into a single importance score per account.",
    "Accounts with higher importance are more likely to be selected to 'harvest' a block.",
    "The selected account bundles pending transactions and produces the block.",
    "Rewards flow back, reinforcing genuinely active, well-connected participants rather than pure hoarders."
  ],
  layer:'L1', vizTag:'IMPORTANCE SCORING',
  vizCaption:'Balance, activity and network connectivity blend into a score that decides who harvests next.',
  trilemma:{scal:7, sec:6, dec:6, blockTime:'~1 min (NEM)', tps:'Moderate', attack:'Sybil clusters gaming the importance graph'},
  explain:"Encourages genuine network usage over simple coin-hoarding, though the scoring formula itself becomes a new thing attackers try to game.",
  performance: { tps: "Moderate", blockTime: "~1 minute", finality: "Probabilistic", energy: "Low", latency: "Medium" },
  pros: ["Encourages active network use", "Doesn't just reward the richest users", "Energy efficient"],
  cons: ["Complex scoring algorithm", "Susceptible to Sybil cluster gaming", "Niche adoption"],
  chains:[
    {name:'NEM (XEM)', why:'Designed PoI specifically to reward active participants and discourage passive whales from dominating block production.', lang:'Smart Assets API (Java/JS)'}
  ],
  summary: { mining: "No", validators: "Harvesters", voting: "No", speed: "Moderate", security: "Moderate", decentralization: "Moderate" }
}
];

// Helper functions for shared state
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function getSelectedAlgo() {
  const algoId = getQueryParam('algo') || 'pow';
  return ALGOS.find(a => a.id === algoId) || ALGOS[0];
}
