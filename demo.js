async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function initDemo(algo) {
  const container = document.getElementById('demoContainer');
  const desc = document.getElementById('demoDescription');
  if(!container) return;
  container.innerHTML = '';
  
  if(algo.id === 'pow') initPowDemo(container, desc);
  else if(algo.id === 'pos') initPosDemo(container, desc);
  else if(algo.id === 'dpos') initDposDemo(container, desc);
  else if(algo.id === 'poa') initPoaDemo(container, desc);
  else if(algo.id === 'poh') initPohDemo(container, desc);
  else if(algo.id === 'pbft') initPbftDemo(container, desc);
  else if(algo.id === 'pospace') initPoSpaceDemo(container, desc);
  else if(algo.id === 'pob') initPobDemo(container, desc);
  else if(algo.id === 'poet') initPoetDemo(container, desc);
  else if(algo.id === 'poi') initPoiDemo(container, desc);
  else container.innerHTML = `<div class="demo-message" style="display:block; color:var(--ink-dim)">Interactive demo coming soon for this algorithm.</div>`;
}

// ==========================================
// 1. PoW Demo
// ==========================================
function initPowDemo(container, desc) {
  desc.textContent = "Proof of Work: Try changing the data. The block becomes invalid (red) because the hash changes. Click 'Mine' to find a new nonce that produces a valid hash (starts with '000'). Each block's hash depends on the previous block's hash!";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="powResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      <!-- Block 1 -->
      <div class="demo-block" id="powBlock1">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #1 (Genesis)</h4>
        </div>
        <div class="demo-row"><span class="demo-label">Nonce</span><input type="number" class="demo-input" id="powNonce1" value="10345"></div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="powData1">Alice sends 5 BTC to Bob</textarea></div>
        <div class="demo-row"><span class="demo-label">Prev</span><input type="text" class="demo-input" id="powPrev1" value="0000000000000000000000000000000000000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="powHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="powMineBtn1">🔨 Mine Block 1</button>
      </div>

      <!-- Block 2 -->
      <div class="demo-block" id="powBlock2">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #2</h4>
        </div>
        <div class="demo-row"><span class="demo-label">Nonce</span><input type="number" class="demo-input" id="powNonce2" value="8942"></div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="powData2">Bob sends 2 BTC to Charlie</textarea></div>
        <div class="demo-row"><span class="demo-label">Prev</span><input type="text" class="demo-input" id="powPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="powHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="powMineBtn2">🔨 Mine Block 2</button>
      </div>

      <!-- Block 3 -->
      <div class="demo-block" id="powBlock3">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #3</h4>
        </div>
        <div class="demo-row"><span class="demo-label">Nonce</span><input type="number" class="demo-input" id="powNonce3" value="3120"></div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="powData3">Charlie sends 1 BTC to Dave</textarea></div>
        <div class="demo-row"><span class="demo-label">Prev</span><input type="text" class="demo-input" id="powPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="powHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="powMineBtn3">🔨 Mine Block 3</button>
      </div>
    </div>
  `;

  const blocks = [
    {
      id: 1,
      blockEl: document.getElementById('powBlock1'),
      nonceEl: document.getElementById('powNonce1'),
      dataEl: document.getElementById('powData1'),
      prevEl: document.getElementById('powPrev1'),
      hashEl: document.getElementById('powHash1'),
      mineBtn: document.getElementById('powMineBtn1'),
      target: "000"
    },
    {
      id: 2,
      blockEl: document.getElementById('powBlock2'),
      nonceEl: document.getElementById('powNonce2'),
      dataEl: document.getElementById('powData2'),
      prevEl: document.getElementById('powPrev2'),
      hashEl: document.getElementById('powHash2'),
      mineBtn: document.getElementById('powMineBtn2'),
      target: "000"
    },
    {
      id: 3,
      blockEl: document.getElementById('powBlock3'),
      nonceEl: document.getElementById('powNonce3'),
      dataEl: document.getElementById('powData3'),
      prevEl: document.getElementById('powPrev3'),
      hashEl: document.getElementById('powHash3'),
      mineBtn: document.getElementById('powMineBtn3'),
      target: "000"
    }
  ];

  let isUpdating = false;
  let pendingUpdate = false;

  async function updateHashes() {
    if (isUpdating) {
      pendingUpdate = true;
      return;
    }
    isUpdating = true;
    pendingUpdate = false;
    
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (i > 0) {
        b.prevEl.value = blocks[i-1].hashEl.value; // Link to previous block's hash
      }
      
      const text = b.id.toString() + b.nonceEl.value + b.dataEl.value + b.prevEl.value;
      const h = await sha256(text);
      b.hashEl.value = h;
      
      if(h.startsWith(b.target)) {
        b.blockEl.classList.remove('invalid');
        b.blockEl.style.borderColor = 'var(--green)';
      } else {
        b.blockEl.classList.add('invalid');
        b.blockEl.style.borderColor = 'var(--red)';
      }
    }
    
    isUpdating = false;
    if (pendingUpdate) updateHashes();
  }

  blocks.forEach((b, i) => {
    b.dataEl.addEventListener('input', updateHashes);
    b.nonceEl.addEventListener('input', updateHashes);
    
    b.mineBtn.addEventListener('click', async () => {
      b.mineBtn.textContent = 'Mining...';
      b.mineBtn.disabled = true;
      let nonce = 0;
      
      const mineStep = async () => {
        for(let j=0; j<800; j++) {
          nonce++;
          const h = await sha256(b.id.toString() + nonce + b.dataEl.value + b.prevEl.value);
          if(h.startsWith(b.target)) {
            b.nonceEl.value = nonce;
            await updateHashes(); // Propagate valid hash to next blocks
            b.mineBtn.textContent = '🔨 Mine Block ' + b.id;
            b.mineBtn.disabled = false;
            return;
          }
        }
        setTimeout(mineStep, 0); // yield to browser to prevent UI freeze
      };
      mineStep();
    });
  });
  
  updateHashes(); // Initialize hashes on load

  document.getElementById('powResetBtn').addEventListener('click', () => initPowDemo(container, desc));
}

// ==========================================
// 2. PoS Demo
// ==========================================
function initPosDemo(container, desc) {
  desc.textContent = "Proof of Stake: Adjust the stake amounts. The probability of being chosen to propose a block is proportional to the stake. Click 'Propose Block' to run the lottery, select a validator, and generate the next block!";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="posResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      
      <!-- Staking Panel -->
      <div class="demo-block" style="background:rgba(0,0,0,0.02); border-color:var(--cyan);">
        <h4 style="margin-top:0; color:var(--cyan); font-family:'Orbitron';">Validator Staking Pool</h4>
        <div class="demo-row">
          <span class="demo-label" style="color:var(--green)">Node A</span>
          <input type="range" id="posA" min="1" max="100" value="50" style="flex-grow:1">
          <span id="posA_val" class="demo-label" style="text-align:right">50 ETH</span>
        </div>
        <div class="demo-row">
          <span class="demo-label" style="color:var(--magenta)">Node B</span>
          <input type="range" id="posB" min="1" max="100" value="20" style="flex-grow:1">
          <span id="posB_val" class="demo-label" style="text-align:right">20 ETH</span>
        </div>
        <div class="demo-row">
          <span class="demo-label" style="color:var(--amber)">Node C</span>
          <input type="range" id="posC" min="1" max="100" value="10" style="flex-grow:1">
          <span id="posC_val" class="demo-label" style="text-align:right">10 ETH</span>
        </div>
      </div>

      <!-- Block 1 -->
      <div class="demo-block" id="posBlock1">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #1 (Genesis)</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="posData1">Staking contract deployed</textarea></div>
        <div class="demo-row"><span class="demo-label">Proposer</span><input type="text" class="demo-input" id="posValidator1" disabled placeholder="Waiting for lottery..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="posPrev1" value="00000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="posHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="posBtn1">🎲 Run Lottery & Propose Block 1</button>
      </div>

      <!-- Block 2 -->
      <div class="demo-block invalid" id="posBlock2" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #2</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="posData2">Alice stakes 32 ETH</textarea></div>
        <div class="demo-row"><span class="demo-label">Proposer</span><input type="text" class="demo-input" id="posValidator2" disabled placeholder="Waiting for lottery..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="posPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="posHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="posBtn2">🎲 Run Lottery & Propose Block 2</button>
      </div>

      <!-- Block 3 -->
      <div class="demo-block invalid" id="posBlock3" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #3</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="posData3">Bob sends 5 ETH to Charlie</textarea></div>
        <div class="demo-row"><span class="demo-label">Proposer</span><input type="text" class="demo-input" id="posValidator3" disabled placeholder="Waiting for lottery..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="posPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="posHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="posBtn3">🎲 Run Lottery & Propose Block 3</button>
      </div>

    </div>
  `;

  const sA = document.getElementById('posA'), vA = document.getElementById('posA_val');
  const sB = document.getElementById('posB'), vB = document.getElementById('posB_val');
  const sC = document.getElementById('posC'), vC = document.getElementById('posC_val');

  const updateStakes = () => {
    vA.textContent = sA.value + ' ETH';
    vB.textContent = sB.value + ' ETH';
    vC.textContent = sC.value + ' ETH';
  };
  sA.addEventListener('input', updateStakes); sB.addEventListener('input', updateStakes); sC.addEventListener('input', updateStakes);

  const blocks = [
    {
      id: 1,
      blockEl: document.getElementById('posBlock1'),
      dataEl: document.getElementById('posData1'),
      valEl: document.getElementById('posValidator1'),
      prevEl: document.getElementById('posPrev1'),
      hashEl: document.getElementById('posHash1'),
      btn: document.getElementById('posBtn1'),
      signed: false
    },
    {
      id: 2,
      blockEl: document.getElementById('posBlock2'),
      dataEl: document.getElementById('posData2'),
      valEl: document.getElementById('posValidator2'),
      prevEl: document.getElementById('posPrev2'),
      hashEl: document.getElementById('posHash2'),
      btn: document.getElementById('posBtn2'),
      signed: false
    },
    {
      id: 3,
      blockEl: document.getElementById('posBlock3'),
      dataEl: document.getElementById('posData3'),
      valEl: document.getElementById('posValidator3'),
      prevEl: document.getElementById('posPrev3'),
      hashEl: document.getElementById('posHash3'),
      btn: document.getElementById('posBtn3'),
      signed: false
    }
  ];

  async function calculateHash(b) {
    if(!b.signed) return; // Only hash if signed by a validator
    const text = b.id.toString() + b.valEl.value + b.dataEl.value + b.prevEl.value;
    b.hashEl.value = await sha256(text);
  }

  blocks.forEach((b, i) => {
    b.btn.addEventListener('click', async () => {
      // Run Lottery
      const a = parseInt(sA.value), b_stake = parseInt(sB.value), c = parseInt(sC.value);
      const total = a + b_stake + c;
      const r = Math.random() * total;
      
      let winnerName, winnerColor;
      if(r < a) { winnerName = 'Node A'; winnerColor = 'var(--green)'; }
      else if (r < a + b_stake) { winnerName = 'Node B'; winnerColor = 'var(--magenta)'; }
      else { winnerName = 'Node C'; winnerColor = 'var(--amber)'; }

      // Assign Validator
      b.valEl.value = `${winnerName} (Selected via Lottery)`;
      b.valEl.style.color = winnerColor;
      b.valEl.style.fontWeight = 'bold';
      b.signed = true;

      // Update Hash
      if(i > 0) b.prevEl.value = blocks[i-1].hashEl.value;
      await calculateHash(b);

      // UI Updates
      b.blockEl.classList.remove('invalid');
      b.blockEl.style.borderColor = 'var(--green)';
      b.btn.textContent = '✅ Block Confirmed & Added';
      b.btn.disabled = true;
      b.btn.style.background = 'var(--green)';
      b.btn.style.color = 'var(--ink)';

      // Enable next block
      if(i+1 < blocks.length) {
        blocks[i+1].blockEl.style.opacity = '1';
        blocks[i+1].blockEl.style.pointerEvents = 'auto';
        blocks[i+1].prevEl.value = b.hashEl.value;
      }
    });

    b.dataEl.addEventListener('input', async () => {
      if(b.signed) {
        await calculateHash(b);
        // Cascade changes to following blocks if they are signed
        for(let j=i+1; j<blocks.length; j++) {
          if(blocks[j].signed) {
            blocks[j].prevEl.value = blocks[j-1].hashEl.value;
            await calculateHash(blocks[j]);
          }
        }
      }
    });
  });

  document.getElementById('posResetBtn').addEventListener('click', () => initPosDemo(container, desc));
}

function initDposDemo(container, desc) {
  desc.textContent = "Delegated Proof of Stake: Allocate your 1000 votes to elect the Top 2 Delegates. Once elected, these active delegates will take turns proposing blocks in a round-robin rotation.";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="dposResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      
      <!-- Voting Panel -->
      <div class="demo-block" style="background:rgba(0,0,0,0.02); border-color:var(--cyan);" id="dposVotePanel">
        <div class="demo-row" style="justify-content:space-between; margin-bottom:10px;">
          <h4 style="margin-top:0; color:var(--cyan); font-family:'Orbitron';">Election: Top 2 Become Delegates</h4>
          <span><span class="demo-label">Votes Left:</span><strong id="dposLeft" style="color:var(--green)">1000</strong></span>
        </div>
        <div class="demo-row">
          <span class="demo-label" style="color:var(--cyan)">Candidate 1</span>
          <input type="number" id="dc1" class="demo-input dpos-in" value="500" min="0" max="1000">
        </div>
        <div class="demo-row">
          <span class="demo-label" style="color:var(--magenta)">Candidate 2</span>
          <input type="number" id="dc2" class="demo-input dpos-in" value="300" min="0" max="1000">
        </div>
        <div class="demo-row">
          <span class="demo-label" style="color:var(--amber)">Candidate 3</span>
          <input type="number" id="dc3" class="demo-input dpos-in" value="200" min="0" max="1000">
        </div>
        <button class="demo-btn" id="dposVoteBtn" style="margin-top:10px;">🗳 Submit Votes & Lock Election</button>
        <div id="dposRes" class="demo-message"></div>
      </div>

      <!-- Block 1 -->
      <div class="demo-block invalid" id="dposBlock1" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #1 (Genesis)</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="dposData1">DPoS Network Launched</textarea></div>
        <div class="demo-row"><span class="demo-label">Proposer</span><input type="text" class="demo-input" id="dposValidator1" disabled placeholder="Awaiting election..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="dposPrev1" value="00000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="dposHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="dposBtn1">🎲 Delegate Turn: Propose Block 1</button>
      </div>

      <!-- Block 2 -->
      <div class="demo-block invalid" id="dposBlock2" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #2</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="dposData2">Alice pays 10 EOS to Bob</textarea></div>
        <div class="demo-row"><span class="demo-label">Proposer</span><input type="text" class="demo-input" id="dposValidator2" disabled placeholder="Awaiting turn..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="dposPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="dposHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="dposBtn2">🎲 Delegate Turn: Propose Block 2</button>
      </div>

      <!-- Block 3 -->
      <div class="demo-block invalid" id="dposBlock3" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #3</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="dposData3">Bob executes smart contract</textarea></div>
        <div class="demo-row"><span class="demo-label">Proposer</span><input type="text" class="demo-input" id="dposValidator3" disabled placeholder="Awaiting turn..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="dposPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="dposHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="dposBtn3">🎲 Delegate Turn: Propose Block 3</button>
      </div>

    </div>
  `;

  const inputs = document.querySelectorAll('.dpos-in');
  const left = document.getElementById('dposLeft');
  inputs.forEach(inp => {
    inp.addEventListener('input', () => {
      let sum = 0; inputs.forEach(i => sum += parseInt(i.value||0));
      left.textContent = (1000 - sum);
      left.style.color = (1000-sum) < 0 ? 'var(--red)' : 'var(--green)';
    });
  });

  let topDelegates = [];

  document.getElementById('dposVoteBtn').addEventListener('click', () => {
    let sum = 0; inputs.forEach(i => sum += parseInt(i.value||0));
    const res = document.getElementById('dposRes');
    if(sum > 1000) {
      res.textContent = "Invalid! You cast more votes than you hold.";
      res.className = 'demo-message error';
    } else {
      const candidates = [
        {n:'Candidate 1', c:'var(--cyan)', v:parseInt(inputs[0].value||0)},
        {n:'Candidate 2', c:'var(--magenta)', v:parseInt(inputs[1].value||0)},
        {n:'Candidate 3', c:'var(--amber)', v:parseInt(inputs[2].value||0)}
      ].sort((a,b) => b.v - a.v);
      
      topDelegates = [candidates[0], candidates[1]]; // Top 2
      
      res.innerHTML = `<b>Elected Delegates (Round-Robin Order):</b><br>1. ${topDelegates[0].n} (${topDelegates[0].v} votes)<br>2. ${topDelegates[1].n} (${topDelegates[1].v} votes)<br><span style="color:var(--ink-dim)">Standby: ${candidates[2].n}</span>`;
      res.className = 'demo-message success';
      
      // Lock voting
      document.getElementById('dposVoteBtn').disabled = true;
      inputs.forEach(i => i.disabled = true);
      
      // Enable first block
      const b1 = document.getElementById('dposBlock1');
      b1.style.opacity = '1';
      b1.style.pointerEvents = 'auto';
      b1.classList.remove('invalid');
      b1.style.borderColor = 'var(--line)';
      
      document.getElementById('dposBtn1').textContent = `🎲 Delegate ${topDelegates[0].n} Turn: Propose Block 1`;
      document.getElementById('dposBtn2').textContent = `🎲 Delegate ${topDelegates[1].n} Turn: Propose Block 2`;
      document.getElementById('dposBtn3').textContent = `🎲 Delegate ${topDelegates[0].n} Turn: Propose Block 3`;
    }
  });

  const blocks = [
    {
      id: 1,
      blockEl: document.getElementById('dposBlock1'),
      dataEl: document.getElementById('dposData1'),
      valEl: document.getElementById('dposValidator1'),
      prevEl: document.getElementById('dposPrev1'),
      hashEl: document.getElementById('dposHash1'),
      btn: document.getElementById('dposBtn1'),
      delegateIndex: 0,
      signed: false
    },
    {
      id: 2,
      blockEl: document.getElementById('dposBlock2'),
      dataEl: document.getElementById('dposData2'),
      valEl: document.getElementById('dposValidator2'),
      prevEl: document.getElementById('dposPrev2'),
      hashEl: document.getElementById('dposHash2'),
      btn: document.getElementById('dposBtn2'),
      delegateIndex: 1,
      signed: false
    },
    {
      id: 3,
      blockEl: document.getElementById('dposBlock3'),
      dataEl: document.getElementById('dposData3'),
      valEl: document.getElementById('dposValidator3'),
      prevEl: document.getElementById('dposPrev3'),
      hashEl: document.getElementById('dposHash3'),
      btn: document.getElementById('dposBtn3'),
      delegateIndex: 0, // Loops back to 0
      signed: false
    }
  ];

  async function calculateHash(b) {
    if(!b.signed) return; 
    const text = b.id.toString() + b.valEl.value + b.dataEl.value + b.prevEl.value;
    b.hashEl.value = await sha256(text);
  }

  blocks.forEach((b, i) => {
    b.btn.addEventListener('click', async () => {
      if (topDelegates.length === 0) return;
      
      const activeDel = topDelegates[b.delegateIndex];

      // Assign Validator
      b.valEl.value = `${activeDel.n} (Elected Delegate)`;
      b.valEl.style.color = activeDel.c;
      b.valEl.style.fontWeight = 'bold';
      b.signed = true;

      // Update Hash
      if(i > 0) b.prevEl.value = blocks[i-1].hashEl.value;
      await calculateHash(b);

      // UI Updates
      b.blockEl.style.borderColor = 'var(--green)';
      b.btn.textContent = '✅ Block Confirmed & Added';
      b.btn.disabled = true;
      b.btn.style.background = 'var(--green)';
      b.btn.style.color = 'var(--ink)';

      // Enable next block
      if(i+1 < blocks.length) {
        blocks[i+1].blockEl.style.opacity = '1';
        blocks[i+1].blockEl.style.pointerEvents = 'auto';
        blocks[i+1].blockEl.classList.remove('invalid');
        blocks[i+1].blockEl.style.borderColor = 'var(--line)';
        blocks[i+1].prevEl.value = b.hashEl.value;
      }
    });

    b.dataEl.addEventListener('input', async () => {
      if(b.signed) {
        await calculateHash(b);
        for(let j=i+1; j<blocks.length; j++) {
          if(blocks[j].signed) {
            blocks[j].prevEl.value = blocks[j-1].hashEl.value;
            await calculateHash(blocks[j]);
          }
        }
      }
    });
  });

  document.getElementById('dposResetBtn').addEventListener('click', () => initDposDemo(container, desc));
}

// ==========================================
// 4. PoA Demo
// ==========================================
function initPoaDemo(container, desc) {
  desc.textContent = "Proof of Authority: Only pre-approved authority nodes can sign blocks. Try proposing blocks with an authorized vs unauthorized identity.";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="poaResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      
      <!-- Identity Panel -->
      <div class="demo-block" style="background:rgba(0,0,0,0.02); border-color:var(--cyan);" id="poaIdentityPanel">
        <div class="demo-row" style="justify-content:space-between; margin-bottom:10px;">
          <h4 style="margin-top:0; color:var(--cyan); font-family:'Orbitron';">Global Signer Identity</h4>
        </div>
        <div class="demo-row">
          <span class="demo-label">Current Node:</span>
          <select id="poaSelect" class="demo-input">
            <option value="auth1">Bank of America (Authorized Validator)</option>
            <option value="auth2">JP Morgan (Authorized Validator)</option>
            <option value="unauth">Unknown Hacker (Unauthorized Node)</option>
          </select>
        </div>
      </div>

      <!-- Block 1 -->
      <div class="demo-block" id="poaBlock1">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #1 (Genesis)</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="poaData1">Clear $5M Settlement</textarea></div>
        <div class="demo-row"><span class="demo-label">Signer</span><input type="text" class="demo-input" id="poaValidator1" disabled placeholder="Waiting for signature..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="poaPrev1" value="00000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="poaHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="poaBtn1">✍ Sign & Propose Block 1</button>
        <div id="poaRes1" class="demo-message" style="display:none; margin-top:10px;"></div>
      </div>

      <!-- Block 2 -->
      <div class="demo-block invalid" id="poaBlock2" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #2</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="poaData2">Process payroll for 10k employees</textarea></div>
        <div class="demo-row"><span class="demo-label">Signer</span><input type="text" class="demo-input" id="poaValidator2" disabled placeholder="Waiting for signature..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="poaPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="poaHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="poaBtn2">✍ Sign & Propose Block 2</button>
        <div id="poaRes2" class="demo-message" style="display:none; margin-top:10px;"></div>
      </div>

      <!-- Block 3 -->
      <div class="demo-block invalid" id="poaBlock3" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #3</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="poaData3">Issue new internal token supply</textarea></div>
        <div class="demo-row"><span class="demo-label">Signer</span><input type="text" class="demo-input" id="poaValidator3" disabled placeholder="Waiting for signature..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="poaPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="poaHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="poaBtn3">✍ Sign & Propose Block 3</button>
        <div id="poaRes3" class="demo-message" style="display:none; margin-top:10px;"></div>
      </div>

    </div>
  `;

  const blocks = [
    {
      id: 1,
      blockEl: document.getElementById('poaBlock1'),
      dataEl: document.getElementById('poaData1'),
      valEl: document.getElementById('poaValidator1'),
      prevEl: document.getElementById('poaPrev1'),
      hashEl: document.getElementById('poaHash1'),
      btn: document.getElementById('poaBtn1'),
      res: document.getElementById('poaRes1'),
      signed: false
    },
    {
      id: 2,
      blockEl: document.getElementById('poaBlock2'),
      dataEl: document.getElementById('poaData2'),
      valEl: document.getElementById('poaValidator2'),
      prevEl: document.getElementById('poaPrev2'),
      hashEl: document.getElementById('poaHash2'),
      btn: document.getElementById('poaBtn2'),
      res: document.getElementById('poaRes2'),
      signed: false
    },
    {
      id: 3,
      blockEl: document.getElementById('poaBlock3'),
      dataEl: document.getElementById('poaData3'),
      valEl: document.getElementById('poaValidator3'),
      prevEl: document.getElementById('poaPrev3'),
      hashEl: document.getElementById('poaHash3'),
      btn: document.getElementById('poaBtn3'),
      res: document.getElementById('poaRes3'),
      signed: false
    }
  ];

  async function calculateHash(b) {
    if(!b.signed) return; 
    const text = b.id.toString() + b.valEl.value + b.dataEl.value + b.prevEl.value;
    b.hashEl.value = await sha256(text);
  }

  blocks.forEach((b, i) => {
    b.btn.addEventListener('click', async () => {
      const s = document.getElementById('poaSelect').value;
      const sText = document.getElementById('poaSelect').options[document.getElementById('poaSelect').selectedIndex].text;
      
      if(s === 'unauth') {
        b.res.textContent = "REJECTED: Signer is not in the Authority List.";
        b.res.className = 'demo-message error';
        b.res.style.display = 'block';
        return;
      }
      
      // Assign Validator
      b.valEl.value = sText;
      b.valEl.style.color = 'var(--cyan)';
      b.valEl.style.fontWeight = 'bold';
      b.signed = true;

      // Update Hash
      if(i > 0) b.prevEl.value = blocks[i-1].hashEl.value;
      await calculateHash(b);

      // UI Updates
      b.res.textContent = "ACCEPTED: Block signed by verified Authority.";
      b.res.className = 'demo-message success';
      b.res.style.display = 'block';
      
      b.blockEl.style.borderColor = 'var(--green)';
      b.btn.textContent = '✅ Block Confirmed & Added';
      b.btn.disabled = true;
      b.btn.style.background = 'var(--green)';
      b.btn.style.color = 'var(--ink)';

      // Enable next block
      if(i+1 < blocks.length) {
        blocks[i+1].blockEl.style.opacity = '1';
        blocks[i+1].blockEl.style.pointerEvents = 'auto';
        blocks[i+1].blockEl.classList.remove('invalid');
        blocks[i+1].blockEl.style.borderColor = 'var(--line)';
        blocks[i+1].prevEl.value = b.hashEl.value;
      }
    });

    b.dataEl.addEventListener('input', async () => {
      if(b.signed) {
        await calculateHash(b);
        for(let j=i+1; j<blocks.length; j++) {
          if(blocks[j].signed) {
            blocks[j].prevEl.value = blocks[j-1].hashEl.value;
            await calculateHash(blocks[j]);
          }
        }
      }
    });
  });

  document.getElementById('poaResetBtn').addEventListener('click', () => initPoaDemo(container, desc));
}

// ==========================================
// 5. PoH Demo
// ==========================================
function initPohDemo(container, desc) {
  desc.textContent = "Proof of History: A continuous cryptographic clock runs in the background. When you propose a block, it is stamped with the exact time hash from the clock, proving when it occurred before it's validated by PoS.";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="pohResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      
      <!-- PoH Clock & PoS Validator Panel -->
      <div class="demo-block" style="background:rgba(0,0,0,0.02); border-color:var(--magenta);" id="pohClockPanel">
        <div class="demo-row" style="justify-content:space-between; margin-bottom:10px;">
          <h4 style="margin-top:0; color:var(--magenta); font-family:'Orbitron';">Continuous Verifiable Delay Function (VDF) Clock</h4>
        </div>
        <div class="demo-row">
          <span class="demo-label" style="color:var(--magenta)">Current Time Hash:</span>
          <input type="text" id="pohClock" class="demo-input" disabled style="font-size:0.85rem; color:var(--magenta); font-weight:bold;">
        </div>
        <div class="demo-row" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.05);">
          <span class="demo-label" style="color:var(--green)">PoS Validator:</span>
          <select id="pohValidatorSelect" class="demo-input">
            <option value="valA">Validator A (Elected via PoS)</option>
            <option value="valB">Validator B (Elected via PoS)</option>
            <option value="valC">Validator C (Elected via PoS)</option>
          </select>
        </div>
      </div>

      <!-- Block 1 -->
      <div class="demo-block" id="pohBlock1">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #1 (Genesis)</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pohData1">Alice bids $10 on NFT</textarea></div>
        <div class="demo-row"><span class="demo-label">PoH Stamp</span><input type="text" class="demo-input" id="pohStamp1" disabled placeholder="Waiting for timestamp..."></div>
        <div class="demo-row"><span class="demo-label">PoS Signer</span><input type="text" class="demo-input" id="pohValidator1" disabled placeholder="Waiting for PoS signature..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pohPrev1" value="00000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pohHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pohBtn1" style="border-color:var(--magenta); color:var(--magenta);">⏱ Stamp & Propose Block 1</button>
      </div>

      <!-- Block 2 -->
      <div class="demo-block invalid" id="pohBlock2" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #2</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pohData2">Bob outbids with $15</textarea></div>
        <div class="demo-row"><span class="demo-label">PoH Stamp</span><input type="text" class="demo-input" id="pohStamp2" disabled placeholder="Waiting for timestamp..."></div>
        <div class="demo-row"><span class="demo-label">PoS Signer</span><input type="text" class="demo-input" id="pohValidator2" disabled placeholder="Waiting for PoS signature..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pohPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pohHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pohBtn2" style="border-color:var(--magenta); color:var(--magenta);">⏱ Stamp & Propose Block 2</button>
      </div>

      <!-- Block 3 -->
      <div class="demo-block invalid" id="pohBlock3" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #3</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pohData3">Auction closes. Alice wins.</textarea></div>
        <div class="demo-row"><span class="demo-label">PoH Stamp</span><input type="text" class="demo-input" id="pohStamp3" disabled placeholder="Waiting for timestamp..."></div>
        <div class="demo-row"><span class="demo-label">PoS Signer</span><input type="text" class="demo-input" id="pohValidator3" disabled placeholder="Waiting for PoS signature..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pohPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pohHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pohBtn3" style="border-color:var(--magenta); color:var(--magenta);">⏱ Stamp & Propose Block 3</button>
      </div>

    </div>
  `;

  let currentHash = "0000000000000000";
  const clock = document.getElementById('pohClock');
  
  // Clear any existing intervals from previous demos to avoid memory leaks
  if(window.pohInterval) clearInterval(window.pohInterval);
  window.pohInterval = setInterval(async () => {
    currentHash = await sha256(currentHash);
    if(clock) clock.value = currentHash.substring(0,32) + "...";
  }, 250); // Faster hash clock

  const blocks = [
    {
      id: 1,
      blockEl: document.getElementById('pohBlock1'),
      dataEl: document.getElementById('pohData1'),
      stampEl: document.getElementById('pohStamp1'),
      valEl: document.getElementById('pohValidator1'),
      prevEl: document.getElementById('pohPrev1'),
      hashEl: document.getElementById('pohHash1'),
      btn: document.getElementById('pohBtn1'),
      signed: false
    },
    {
      id: 2,
      blockEl: document.getElementById('pohBlock2'),
      dataEl: document.getElementById('pohData2'),
      stampEl: document.getElementById('pohStamp2'),
      valEl: document.getElementById('pohValidator2'),
      prevEl: document.getElementById('pohPrev2'),
      hashEl: document.getElementById('pohHash2'),
      btn: document.getElementById('pohBtn2'),
      signed: false
    },
    {
      id: 3,
      blockEl: document.getElementById('pohBlock3'),
      dataEl: document.getElementById('pohData3'),
      stampEl: document.getElementById('pohStamp3'),
      valEl: document.getElementById('pohValidator3'),
      prevEl: document.getElementById('pohPrev3'),
      hashEl: document.getElementById('pohHash3'),
      btn: document.getElementById('pohBtn3'),
      signed: false
    }
  ];

  async function calculateHash(b) {
    if(!b.signed) return; 
    const text = b.id.toString() + b.stampEl.value + b.valEl.value + b.dataEl.value + b.prevEl.value;
    b.hashEl.value = await sha256(text);
  }

  blocks.forEach((b, i) => {
    b.btn.addEventListener('click', async () => {
      // Assign Timestamp from Clock
      b.stampEl.value = currentHash.substring(0,16);
      b.stampEl.style.color = 'var(--magenta)';
      b.stampEl.style.fontWeight = 'bold';

      // Assign PoS Validator
      const valText = document.getElementById('pohValidatorSelect').options[document.getElementById('pohValidatorSelect').selectedIndex].text;
      b.valEl.value = valText;
      b.valEl.style.color = 'var(--green)';
      b.valEl.style.fontWeight = 'bold';
      
      b.signed = true;

      // Update Hash
      if(i > 0) b.prevEl.value = blocks[i-1].hashEl.value;
      await calculateHash(b);

      // UI Updates
      b.blockEl.style.borderColor = 'var(--green)';
      b.btn.textContent = '✅ Time-Stamped & Appended';
      b.btn.disabled = true;
      b.btn.style.background = 'var(--green)';
      b.btn.style.color = 'var(--ink)';
      b.btn.style.borderColor = 'var(--green)';

      // Enable next block
      if(i+1 < blocks.length) {
        blocks[i+1].blockEl.style.opacity = '1';
        blocks[i+1].blockEl.style.pointerEvents = 'auto';
        blocks[i+1].blockEl.classList.remove('invalid');
        blocks[i+1].blockEl.style.borderColor = 'var(--line)';
        blocks[i+1].prevEl.value = b.hashEl.value;
      }
    });

    b.dataEl.addEventListener('input', async () => {
      if(b.signed) {
        await calculateHash(b);
        for(let j=i+1; j<blocks.length; j++) {
          if(blocks[j].signed) {
            blocks[j].prevEl.value = blocks[j-1].hashEl.value;
            await calculateHash(blocks[j]);
          }
        }
      }
    });
  });

  document.getElementById('pohResetBtn').addEventListener('click', () => initPohDemo(container, desc));
}

// ==========================================
// 6. PBFT Demo
// ==========================================
function initPbftDemo(container, desc) {
  desc.textContent = "PBFT: The leader proposes a block. Nodes exchange Pre-Prepare, Prepare, and Commit messages. A 2/3 majority is needed. In this demo, Node 4 is faulty, but consensus is still reached.";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="pbftResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      
      <!-- PBFT Network Panel -->
      <div class="demo-block" style="background:rgba(0,0,0,0.02); border-color:var(--cyan);" id="pbftNetworkPanel">
        <div class="demo-row" style="justify-content:space-between; margin-bottom:10px;">
          <h4 style="margin-top:0; color:var(--cyan); font-family:'Orbitron';">PBFT Validator Network</h4>
        </div>
        <div style="display:flex; justify-content:space-around; margin-top:10px; gap:8px;" id="pbftNodes">
          <div id="pn1" style="border:1px solid var(--line); padding:10px; border-radius:6px; flex:1; max-width:140px; text-align:center;">Node 1<br>(Primary/Leader)</div>
          <div id="pn2" style="border:1px solid var(--line); padding:10px; border-radius:6px; flex:1; max-width:140px; text-align:center;">Node 2<br>(Honest)</div>
          <div id="pn3" style="border:1px solid var(--line); padding:10px; border-radius:6px; flex:1; max-width:140px; text-align:center;">Node 3<br>(Honest)</div>
          <div id="pn4" style="border:1px solid var(--red); padding:10px; border-radius:6px; flex:1; max-width:140px; text-align:center; color:var(--red);">Node 4<br>(Faulty/Offline)</div>
        </div>
        <div id="pbftLog" style="margin-top:20px; font-family:'Share Tech Mono'; color:var(--green); min-height:60px; text-align:center; background:rgba(0,0,0,0.2); padding:10px; border-radius:4px;">Waiting for Leader to propose a block...</div>
      </div>

      <!-- Block 1 -->
      <div class="demo-block" id="pbftBlock1">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #1 (Genesis)</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pbftData1">Initialize Enterprise Supply Chain</textarea></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pbftPrev1" value="00000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pbftHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pbftBtn1">📢 Leader: Propose Block 1</button>
      </div>

      <!-- Block 2 -->
      <div class="demo-block invalid" id="pbftBlock2" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #2</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pbftData2">Shipment #402 left facility</textarea></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pbftPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pbftHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pbftBtn2">📢 Leader: Propose Block 2</button>
      </div>

      <!-- Block 3 -->
      <div class="demo-block invalid" id="pbftBlock3" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #3</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pbftData3">Shipment #402 delivered successfully</textarea></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pbftPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pbftHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pbftBtn3">📢 Leader: Propose Block 3</button>
      </div>

    </div>
  `;

  const blocks = [
    {
      id: 1,
      blockEl: document.getElementById('pbftBlock1'),
      dataEl: document.getElementById('pbftData1'),
      prevEl: document.getElementById('pbftPrev1'),
      hashEl: document.getElementById('pbftHash1'),
      btn: document.getElementById('pbftBtn1'),
      signed: false
    },
    {
      id: 2,
      blockEl: document.getElementById('pbftBlock2'),
      dataEl: document.getElementById('pbftData2'),
      prevEl: document.getElementById('pbftPrev2'),
      hashEl: document.getElementById('pbftHash2'),
      btn: document.getElementById('pbftBtn2'),
      signed: false
    },
    {
      id: 3,
      blockEl: document.getElementById('pbftBlock3'),
      dataEl: document.getElementById('pbftData3'),
      prevEl: document.getElementById('pbftPrev3'),
      hashEl: document.getElementById('pbftHash3'),
      btn: document.getElementById('pbftBtn3'),
      signed: false
    }
  ];

  async function calculateHash(b) {
    if(!b.signed) return; 
    const text = b.id.toString() + b.dataEl.value + b.prevEl.value;
    b.hashEl.value = await sha256(text);
  }

  const log = document.getElementById('pbftLog');

  blocks.forEach((b, i) => {
    b.btn.addEventListener('click', () => {
      b.btn.disabled = true;
      log.style.color = "var(--cyan)";
      log.innerHTML = `Block ${b.id}: <b>Pre-Prepare</b> Phase... Leader (Node 1) broadcasting block.`;
      
      // Simulate network rounds
      setTimeout(() => {
        log.style.color = "var(--magenta)";
        log.innerHTML = `Block ${b.id}: <b>Prepare</b> Phase... Nodes 1, 2, 3 broadcast Prepare. Node 4 is silent.`;
        
        setTimeout(() => {
          log.style.color = "var(--magenta)";
          log.innerHTML = `Block ${b.id}: <b>Commit</b> Phase... Nodes 1, 2, 3 collected 3/4 prepares (2/3 majority met). Broadcasting Commit.`;
          
          setTimeout(async () => {
            log.style.color = "var(--green)";
            log.innerHTML = `<b>Finalized:</b> Block ${b.id} appended! Faulty Node 4 was ignored.`;
            
            b.signed = true;
            if(i > 0) b.prevEl.value = blocks[i-1].hashEl.value;
            await calculateHash(b);

            // UI Updates
            b.blockEl.style.borderColor = 'var(--green)';
            b.btn.textContent = '✅ Consensus Reached (3/4 Nodes)';
            b.btn.style.background = 'var(--green)';
            b.btn.style.color = 'var(--ink)';
            b.btn.style.borderColor = 'var(--green)';

            // Enable next block
            if(i+1 < blocks.length) {
              blocks[i+1].blockEl.style.opacity = '1';
              blocks[i+1].blockEl.style.pointerEvents = 'auto';
              blocks[i+1].blockEl.classList.remove('invalid');
              blocks[i+1].blockEl.style.borderColor = 'var(--line)';
              blocks[i+1].prevEl.value = b.hashEl.value;
            }
          }, 1500);
        }, 1500);
      }, 1500);
    });

    b.dataEl.addEventListener('input', async () => {
      if(b.signed) {
        await calculateHash(b);
        for(let j=i+1; j<blocks.length; j++) {
          if(blocks[j].signed) {
            blocks[j].prevEl.value = blocks[j-1].hashEl.value;
            await calculateHash(blocks[j]);
          }
        }
      }
    });
  });

  document.getElementById('pbftResetBtn').addEventListener('click', () => initPbftDemo(container, desc));
}

// ==========================================
// 7. PoSpace Demo
// ==========================================
function initPoSpaceDemo(container, desc) {
  desc.textContent = "Proof of Space: Allocate hard drive space (plots). The network broadcasts a challenge, and the farmer with the closest match in their plots wins.";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="pspResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      
      <!-- Network Farming Panel -->
      <div class="demo-block" style="background:rgba(0,0,0,0.02); border-color:var(--cyan);" id="pspNetworkPanel">
        <div class="demo-row" style="justify-content:space-between; margin-bottom:10px;">
          <h4 style="margin-top:0; color:var(--cyan); font-family:'Orbitron';">Global Farming Network</h4>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div class="demo-row">
            <span class="demo-label" style="width:100px;">Your Farm</span>
            <input type="range" id="pspDisk" min="10" max="1000" value="100" style="flex-grow:1">
            <span id="pspVal" class="demo-label" style="width:70px; text-align:right;">100 TB</span>
          </div>
          <div class="demo-row">
            <span class="demo-label" style="width:100px; color:var(--ink-faint);">Rival Farm A</span>
            <input type="range" id="pspRivalA" min="10" max="1000" value="400" style="flex-grow:1;">
            <span id="pspValA" class="demo-label" style="width:70px; text-align:right; color:var(--ink-faint);">400 TB</span>
          </div>
          <div class="demo-row">
            <span class="demo-label" style="width:100px; color:var(--ink-faint);">Rival Farm B</span>
            <input type="range" id="pspRivalB" min="10" max="1000" value="500" style="flex-grow:1;">
            <span id="pspValB" class="demo-label" style="width:70px; text-align:right; color:var(--ink-faint);">500 TB</span>
          </div>
        </div>
        <div id="pspLog" style="margin-top:15px; font-family:'Share Tech Mono'; color:var(--magenta); text-align:center;">Network Total: 1000 TB. Your Win Chance: 10.0%</div>
      </div>

      <!-- Block 1 -->
      <div class="demo-block" id="pspBlock1">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #1</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pspData1">Farmer joined pool</textarea></div>
        <div class="demo-row"><span class="demo-label">Farmer</span><input type="text" class="demo-input" id="pspFarmer1" disabled placeholder="Waiting for hash match..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pspPrev1" value="00000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pspHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pspBtn1">📡 Receive Challenge & Search Plots</button>
      </div>

      <!-- Block 2 -->
      <div class="demo-block invalid" id="pspBlock2" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #2</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pspData2">TX: Alice -> Bob 5 XCH</textarea></div>
        <div class="demo-row"><span class="demo-label">Farmer</span><input type="text" class="demo-input" id="pspFarmer2" disabled placeholder="Waiting for hash match..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pspPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pspHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pspBtn2">📡 Receive Challenge & Search Plots</button>
      </div>

      <!-- Block 3 -->
      <div class="demo-block invalid" id="pspBlock3" style="opacity:0.5; pointer-events:none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--cyan); font-family:'Orbitron';">Block #3</h4>
        </div>
        <div class="demo-row" style="align-items:flex-start;"><span class="demo-label">Data</span><textarea class="demo-textarea" id="pspData3">TX: Bob -> Charlie 2 XCH</textarea></div>
        <div class="demo-row"><span class="demo-label">Farmer</span><input type="text" class="demo-input" id="pspFarmer3" disabled placeholder="Waiting for hash match..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pspPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pspHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pspBtn3">📡 Receive Challenge & Search Plots</button>
      </div>

    </div>
  `;

  const blocks = [
    {
      id: 1,
      blockEl: document.getElementById('pspBlock1'),
      dataEl: document.getElementById('pspData1'),
      farmerEl: document.getElementById('pspFarmer1'),
      prevEl: document.getElementById('pspPrev1'),
      hashEl: document.getElementById('pspHash1'),
      btn: document.getElementById('pspBtn1'),
      signed: false
    },
    {
      id: 2,
      blockEl: document.getElementById('pspBlock2'),
      dataEl: document.getElementById('pspData2'),
      farmerEl: document.getElementById('pspFarmer2'),
      prevEl: document.getElementById('pspPrev2'),
      hashEl: document.getElementById('pspHash2'),
      btn: document.getElementById('pspBtn2'),
      signed: false
    },
    {
      id: 3,
      blockEl: document.getElementById('pspBlock3'),
      dataEl: document.getElementById('pspData3'),
      farmerEl: document.getElementById('pspFarmer3'),
      prevEl: document.getElementById('pspPrev3'),
      hashEl: document.getElementById('pspHash3'),
      btn: document.getElementById('pspBtn3'),
      signed: false
    }
  ];

  async function calculateHash(b) {
    if(!b.signed) return; 
    const text = b.id.toString() + b.farmerEl.value + b.dataEl.value + b.prevEl.value;
    b.hashEl.value = await sha256(text);
  }

  const disk = document.getElementById('pspDisk');
  const rivalA = document.getElementById('pspRivalA');
  const rivalB = document.getElementById('pspRivalB');
  const val = document.getElementById('pspVal');
  const valA = document.getElementById('pspValA');
  const valB = document.getElementById('pspValB');
  const log = document.getElementById('pspLog');

  function updateStats() {
    const myDisk = parseInt(disk.value);
    const rA = parseInt(rivalA.value);
    const rB = parseInt(rivalB.value);
    
    val.textContent = myDisk + ' TB';
    valA.textContent = rA + ' TB';
    valB.textContent = rB + ' TB';
    
    const total = myDisk + rA + rB;
    const chance = ((myDisk / total) * 100).toFixed(1);
    log.textContent = `Network Total: ${total} TB. Your Win Chance: ${chance}%`;
  }

  disk.addEventListener('input', updateStats);
  rivalA.addEventListener('input', updateStats);
  rivalB.addEventListener('input', updateStats);
  updateStats();

  blocks.forEach((b, i) => {
    b.btn.addEventListener('click', () => {
      b.btn.disabled = true;
      b.btn.textContent = "🔍 Scanning Plots for Match...";
      b.btn.style.borderColor = "var(--amber)";
      b.btn.style.color = "var(--amber)";
      
      setTimeout(async () => {
        const myDisk = parseInt(disk.value);
        const rA = parseInt(rivalA.value);
        const rB = parseInt(rivalB.value);
        const total = myDisk + rA + rB;
        const r = Math.random() * total;
        
        let winnerName = "";
        let isMe = false;

        if (r < myDisk) {
          winnerName = "You (Your Farm)";
          isMe = true;
        } else if (r < myDisk + rA) {
          winnerName = "Rival Farm A";
        } else {
          winnerName = "Rival Farm B";
        }

        b.farmerEl.value = winnerName;
        b.farmerEl.style.color = isMe ? "var(--green)" : "var(--amber)";
        b.farmerEl.style.fontWeight = "bold";

        b.signed = true;
        if(i > 0) b.prevEl.value = blocks[i-1].hashEl.value;
        await calculateHash(b);

        // UI Updates
        b.blockEl.style.borderColor = isMe ? 'var(--green)' : 'var(--amber)';
        b.btn.textContent = isMe ? '🏆 You Won & Signed Block!' : '⚠️ Rival Won Block';
        b.btn.style.background = isMe ? 'var(--green)' : 'var(--amber)';
        b.btn.style.color = 'var(--ink)';
        b.btn.style.borderColor = isMe ? 'var(--green)' : 'var(--amber)';

        // Enable next block
        if(i+1 < blocks.length) {
          blocks[i+1].blockEl.style.opacity = '1';
          blocks[i+1].blockEl.style.pointerEvents = 'auto';
          blocks[i+1].blockEl.classList.remove('invalid');
          blocks[i+1].blockEl.style.borderColor = 'var(--line)';
          blocks[i+1].prevEl.value = b.hashEl.value;
        }
      }, 1200);
    });

    b.dataEl.addEventListener('input', async () => {
      if(b.signed) {
        await calculateHash(b);
        for(let j=i+1; j<blocks.length; j++) {
          if(blocks[j].signed) {
            blocks[j].prevEl.value = blocks[j-1].hashEl.value;
            await calculateHash(blocks[j]);
          }
        }
      }
    });
  });

  document.getElementById('pspResetBtn').addEventListener('click', () => initPoSpaceDemo(container, desc));
}

// ==========================================
// 8. PoB Demo
// ==========================================
function initPobDemo(container, desc) {
  desc.textContent = "Proof of Burn: Burn your coins to gain Virtual Mining Power. Higher power increases your chance of winning block creation rights.";
  
  container.innerHTML = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 15px;">
      <button class="demo-btn" id="pobResetBtn" style="padding: 6px 12px; font-size: 0.85rem;">↺ Reset Demo</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      
      <!-- Network Panel -->
      <div class="demo-block" style="background:rgba(0,0,0,0.02); border-color:var(--amber);">
        <div class="demo-row" style="justify-content:space-between; margin-bottom:10px;">
          <h4 style="margin-top:0; color:var(--amber); font-family:'Orbitron';">Virtual Mining Network</h4>
        </div>
        
        <div style="display:flex; justify-content:space-between; gap:20px; align-items:flex-end; flex-wrap:wrap;">
          <div style="flex-grow:1;">
            <div class="demo-row">
              <span class="demo-label" style="width:140px;">Your Wallet Balance</span>
              <strong id="pobBal" style="font-size:1.1rem;">1000 Coins</strong>
            </div>
            <div class="demo-row" style="margin-top:10px;">
              <span class="demo-label" style="width:140px; color:var(--amber)">Your Virtual Power</span>
              <strong id="pobPow" style="font-size:1.1rem; color:var(--amber)">0</strong>
            </div>
            <div class="demo-row" style="margin-top:10px;">
              <span class="demo-label" style="width:140px; color:var(--ink-faint)">Rival A Virtual Power</span>
              <span style="font-size:1.1rem; color:var(--ink-faint)">500</span>
            </div>
            <div class="demo-row" style="margin-top:10px;">
              <span class="demo-label" style="width:140px; color:var(--ink-faint)">Rival B Virtual Power</span>
              <span style="font-size:1.1rem; color:var(--ink-faint)">300</span>
            </div>
          </div>
          
          <div style="display:flex; flex-direction:column; gap:10px; width:180px;">
            <label style="font-size:0.75rem; color:var(--amber); font-weight:bold;">🔥 Burn Coins for Power</label>
            <input type="number" id="pobAmt" class="demo-input" value="100" min="10" step="10">
            <button class="demo-btn" id="pobBurnBtn" style="border-color:var(--amber); color:var(--amber);">Destroy Coins</button>
          </div>
        </div>
        <div id="pobLog" style="margin-top:15px; font-family:'Share Tech Mono'; color:var(--magenta); text-align:center;">Network Total Power: 800. Your Win Chance: 0.0%</div>
      </div>

      <!-- Block 1 -->
      <div class="demo-block" id="pobBlock1">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--red);">Block #1</h4>
        </div>
        <div class="demo-row"><span class="demo-label">Data</span><textarea class="demo-input" id="pobData1" rows="2">TX: Alice → Bob 5 BTC</textarea></div>
        <div class="demo-row"><span class="demo-label">Producer</span><input type="text" class="demo-input" id="pobProd1" disabled placeholder="Waiting for selection..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pobPrev1" value="00000000000000000000000000000000" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pobHash1" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pobBtn1" style="margin-top:15px; border-color:var(--amber); color:var(--amber);">🔥 Compete to Produce Block</button>
      </div>

      <!-- Block 2 -->
      <div class="demo-block" id="pobBlock2" style="opacity: 0.4; pointer-events: none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--red);">Block #2</h4>
        </div>
        <div class="demo-row"><span class="demo-label">Data</span><textarea class="demo-input" id="pobData2" rows="2">TX: Charlie → Dave 1 BTC</textarea></div>
        <div class="demo-row"><span class="demo-label">Producer</span><input type="text" class="demo-input" id="pobProd2" disabled placeholder="Waiting for selection..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pobPrev2" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pobHash2" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pobBtn2" style="margin-top:15px; border-color:var(--amber); color:var(--amber);">🔥 Compete to Produce Block</button>
      </div>

      <!-- Block 3 -->
      <div class="demo-block" id="pobBlock3" style="opacity: 0.4; pointer-events: none;">
        <div class="demo-row" style="justify-content:space-between; margin-bottom: 16px;">
          <h4 style="margin:0; color:var(--red);">Block #3</h4>
        </div>
        <div class="demo-row"><span class="demo-label">Data</span><textarea class="demo-input" id="pobData3" rows="2">TX: Eve → Frank 10 BTC</textarea></div>
        <div class="demo-row"><span class="demo-label">Producer</span><input type="text" class="demo-input" id="pobProd3" disabled placeholder="Waiting for selection..."></div>
        <div class="demo-row"><span class="demo-label">Prev Hash</span><input type="text" class="demo-input" id="pobPrev3" disabled style="font-size:0.75rem; color:var(--ink-faint);"></div>
        <div class="demo-row"><span class="demo-label">Hash</span><input type="text" class="demo-input" id="pobHash3" disabled style="font-size:0.75rem;"></div>
        <button class="demo-btn" id="pobBtn3" style="margin-top:15px; border-color:var(--amber); color:var(--amber);">🔥 Compete to Produce Block</button>
      </div>
      
    </div>
  `;

  let state = {
    bal: 1000,
    pow: 0,
    rA: 500,
    rB: 300
  };

  const balEl = document.getElementById('pobBal');
  const powEl = document.getElementById('pobPow');
  const logEl = document.getElementById('pobLog');
  const amtEl = document.getElementById('pobAmt');

  function updateStats() {
    balEl.textContent = state.bal + ' Coins';
    powEl.textContent = state.pow;
    const total = state.pow + state.rA + state.rB;
    const chance = ((state.pow / total) * 100).toFixed(1);
    logEl.textContent = `Network Total Power: ${total}. Your Win Chance: ${chance}%`;
  }

  document.getElementById('pobBurnBtn').addEventListener('click', () => {
    let amt = parseInt(amtEl.value);
    if(isNaN(amt) || amt <= 0) return;
    if(amt > state.bal) amt = state.bal; // burn max available
    
    state.bal -= amt;
    state.pow += amt; // 1 coin = 1 virtual power
    updateStats();
    
    const btn = document.getElementById('pobBurnBtn');
    btn.textContent = "🔥 Burned!";
    setTimeout(() => btn.textContent = "Destroy Coins", 1000);
  });

  const blocks = [
    {
      blockEl: document.getElementById('pobBlock1'),
      dataEl: document.getElementById('pobData1'),
      prodEl: document.getElementById('pobProd1'),
      prevEl: document.getElementById('pobPrev1'),
      hashEl: document.getElementById('pobHash1'),
      btn: document.getElementById('pobBtn1'),
      signed: false
    },
    {
      blockEl: document.getElementById('pobBlock2'),
      dataEl: document.getElementById('pobData2'),
      prodEl: document.getElementById('pobProd2'),
      prevEl: document.getElementById('pobPrev2'),
      hashEl: document.getElementById('pobHash2'),
      btn: document.getElementById('pobBtn2'),
      signed: false
    },
    {
      blockEl: document.getElementById('pobBlock3'),
      dataEl: document.getElementById('pobData3'),
      prodEl: document.getElementById('pobProd3'),
      prevEl: document.getElementById('pobPrev3'),
      hashEl: document.getElementById('pobHash3'),
      btn: document.getElementById('pobBtn3'),
      signed: false
    }
  ];

  blocks.forEach((b, i) => {
    b.btn.addEventListener('click', () => {
      b.btn.disabled = true;
      b.btn.textContent = "Selecting Winner...";
      b.btn.style.borderColor = "var(--line)";
      b.btn.style.color = "var(--ink-faint)";
      
      setTimeout(async () => {
        const total = state.pow + state.rA + state.rB;
        const r = Math.random() * total;
        
        let winnerName = "";
        let isMe = false;

        if (r < state.pow) {
          winnerName = "You";
          isMe = true;
        } else if (r < state.pow + state.rA) {
          winnerName = "Rival A";
        } else {
          winnerName = "Rival B";
        }

        b.prodEl.value = winnerName;
        b.prodEl.style.color = isMe ? "var(--green)" : "var(--amber)";
        b.prodEl.style.fontWeight = "bold";

        if(isMe) {
          state.bal += 50; // Block reward
          updateStats();
        }

        b.signed = true;
        if(i > 0) b.prevEl.value = blocks[i-1].hashEl.value;
        await updateBlockHash(b);
        
        b.btn.textContent = isMe ? "✅ You Produced Block (+50 Reward)" : "⚠️ Rival Produced Block";
        b.btn.style.borderColor = isMe ? "var(--green)" : "var(--amber)";
        b.btn.style.color = isMe ? "var(--green)" : "var(--amber)";
        b.blockEl.style.borderColor = isMe ? "var(--green)" : "var(--amber)";
        
        // Enable next block
        if(i+1 < blocks.length) {
          blocks[i+1].blockEl.style.opacity = '1';
          blocks[i+1].blockEl.style.pointerEvents = 'auto';
          blocks[i+1].prevEl.value = b.hashEl.value;
          blocks[i+1].btn.disabled = false;
        }
      }, 1000);
    });

    b.dataEl.addEventListener('input', async () => {
      if(b.signed) {
        await updateBlockHash(b);
        for(let j=i+1; j<blocks.length; j++) {
          if(blocks[j].signed) {
            blocks[j].prevEl.value = blocks[j-1].hashEl.value;
            await updateBlockHash(blocks[j]);
          }
        }
      }
    });
  });

  document.getElementById('pobResetBtn').addEventListener('click', () => initPobDemo(container, desc));
  
  async function updateBlockHash(b) {
    const content = b.dataEl.value + b.prodEl.value + b.prevEl.value;
    b.hashEl.value = await sha256(content);
  }

  // Initialize initial hash
  updateBlockHash(blocks[0]);
}

// ==========================================
// 9. PoET Demo
// ==========================================
function initPoetDemo(container, desc) {
  desc.textContent = "Proof of Elapsed Time: A hardware enclave assigns a random wait time. First to wake up wins.";
  container.innerHTML = `
    <div class="demo-block" style="text-align:center;">
      <button class="demo-btn" id="poetBtn">🎲 Request Wait Times</button>
      <div style="display:flex; justify-content:space-around; margin-top:30px;" id="poetNodes">
        <div style="border:1px solid var(--line); padding:10px; border-radius:6px; width:100px;">Node 1<br><b id="pt1" style="font-size:1.5rem; color:var(--cyan)">--</b></div>
        <div style="border:1px solid var(--line); padding:10px; border-radius:6px; width:100px;">Node 2<br><b id="pt2" style="font-size:1.5rem; color:var(--cyan)">--</b></div>
        <div style="border:1px solid var(--line); padding:10px; border-radius:6px; width:100px;">Node 3<br><b id="pt3" style="font-size:1.5rem; color:var(--cyan)">--</b></div>
      </div>
      <div id="poetRes" class="demo-message"></div>
    </div>
  `;
  let intr;
  document.getElementById('poetBtn').addEventListener('click', () => {
    clearInterval(intr);
    const t = [Math.floor(Math.random()*50)+10, Math.floor(Math.random()*50)+10, Math.floor(Math.random()*50)+10];
    const els = [document.getElementById('pt1'), document.getElementById('pt2'), document.getElementById('pt3')];
    const res = document.getElementById('poetRes');
    res.style.display = 'none';
    
    intr = setInterval(() => {
      let winner = -1;
      for(let i=0; i<3; i++) {
        t[i]--;
        els[i].textContent = Math.max(0, t[i]);
        if(t[i] === 0 && winner === -1) winner = i;
      }
      if(winner > -1) {
        clearInterval(intr);
        els[winner].style.color = 'var(--green)';
        res.textContent = `Node ${winner+1}'s timer expired first! They produce the block.`;
        res.className = 'demo-message success';
      }
    }, 100);
  });
}

// ==========================================
// 10. PoI Demo
// ==========================================
function initPoiDemo(container, desc) {
  desc.textContent = "Proof of Importance: Adjust your network activity. More balance and more transactions increase your importance score.";
  container.innerHTML = `
    <div class="demo-block">
      <div class="demo-row"><span class="demo-label" style="width:100px">Vested Balance</span><input type="range" id="poiBal" min="1" max="100" value="10" style="flex-grow:1"></div>
      <div class="demo-row"><span class="demo-label" style="width:100px">Recent Txs</span><input type="range" id="poiTx" min="1" max="100" value="5" style="flex-grow:1"></div>
      <hr style="border-color:var(--line); margin: 20px 0;">
      <div style="text-align:center;">
        <span style="color:var(--ink-dim)">Your Importance Score</span><br>
        <strong id="poiScore" style="font-size:3rem; color:var(--green); font-family:'Orbitron'">0.015</strong>
      </div>
    </div>
  `;
  const bal = document.getElementById('poiBal'), tx = document.getElementById('poiTx'), score = document.getElementById('poiScore');
  const update = () => {
    // arbitrary formula for demo
    const s = ((parseInt(bal.value)*0.6) + (parseInt(tx.value)*1.4)) / 2000;
    score.textContent = s.toFixed(4);
  };
  bal.addEventListener('input', update);
  tx.addEventListener('input', update);
  update();
}
