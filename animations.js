/* =========================================================
   CANVAS ANIMATIONS
========================================================= */
const cv = document.getElementById('algoCanvas');
const ctx = cv ? cv.getContext('2d') : null;
let W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);

function resizeCanvas(){
  if(!cv || !ctx) return;
  const rect = cv.getBoundingClientRect();
  W = rect.width; H = rect.height || 260;
  cv.width = W*DPR; cv.height = H*DPR;
  ctx.setTransform(DPR,0,0,DPR,0,0);
}
window.addEventListener('resize', resizeCanvas);

const COLORS = {cyan:'#d32f2f', magenta:'#b71c1c', green:'#2e7d32', amber:'#f57c00', red:'#c62828', dim:'#e0e0e0', ink:'#222222'};

function drawNode(x,y,r,label,active){
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fillStyle = active ? 'rgba(211,47,47,.18)' : 'rgba(0,0,0,.03)';
  ctx.fill();
  ctx.lineWidth = active?2:1;
  ctx.strokeStyle = active ? COLORS.cyan : COLORS.dim;
  ctx.shadowColor = active ? COLORS.cyan : 'transparent';
  ctx.shadowBlur = active ? 14 : 0;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = active ? COLORS.cyan : '#888888';
  ctx.font = '10px "Share Tech Mono"';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(label, x, y);
}

function drawBlock(x,y,s,color,alpha=1){
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(0,0,0,.02)';
  ctx.fillRect(x-s/2,y-s/2,s,s);
  ctx.lineWidth=1.5;
  ctx.strokeStyle = color;
  ctx.shadowColor = color; ctx.shadowBlur=10;
  ctx.strokeRect(x-s/2,y-s/2,s,s);
  ctx.shadowBlur=0;
  ctx.globalAlpha=1;
}

/* per-algorithm animation state, reset on switch */
let vizState = {};
let vizAlgoId = null;
function setVizAlgo(a){
  vizAlgoId = a.id;
  document.getElementById('vizTag').textContent = a.vizTag;
  document.getElementById('vizCaption').textContent = a.vizCaption;
  vizState = { t:0, chain:[], phase:0, chainOffset: 0 };
  resizeCanvas();
}

function pushBlock(color=COLORS.cyan) {
  if(!vizState.chain) vizState.chain = [];
  vizState.chain.push({ color });
  vizState.chainOffset = 50; // trigger slide animation
}

/* dynamic chain of confirmed blocks */
function drawDynamicChain(){
  if(!vizState.chain) vizState.chain = [];
  const y = H-26;
  const gap = 50;
  
  if(vizState.chainOffset > 0) vizState.chainOffset -= 3;
  if(vizState.chainOffset < 0) vizState.chainOffset = 0;

  const totalBlocks = vizState.chain.length;
  // center minus a bit so it grows leftwards, but newest block appears on the right
  const startX = W/2 + 60; 
  
  for(let i=0; i<totalBlocks; i++){
    const blockX = startX - (totalBlocks - 1 - i) * gap + vizState.chainOffset;
    if(blockX < -30) continue; // off screen

    const isNew = (i === totalBlocks - 1);
    let alpha = 1;
    if(isNew && vizState.chainOffset > 0) {
      alpha = 1 - (vizState.chainOffset / gap);
    }
    
    drawBlock(blockX, y, 22, vizState.chain[i].color, alpha);
    
    if(i > 0){
      const prevX = blockX - gap;
      ctx.strokeStyle = 'rgba(211,47,47,.25)';
      ctx.beginPath();
      ctx.moveTo(prevX + 11, y);
      ctx.lineTo(blockX - 11, y);
      ctx.stroke();
    }
  }
}

function animPow(t){
  const miners = 4;
  const cx0 = W/2, topY = 60;
  const spacing = Math.min(120, (W-80)/(miners-1||1));
  const baseX = cx0 - spacing*(miners-1)/2;
  if(!vizState.nonces) vizState.nonces = Array(miners).fill(0).map(()=>Math.random()*999|0);
  if(!vizState.winner) vizState.winner=-1;
  if(!vizState.winTimer) vizState.winTimer=0;

  ctx.clearRect(0,0,W,H);
  ctx.font='11px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink; ctx.textAlign='center';
  ctx.fillText('TARGET: hash < difficulty', W/2, 20);

  for(let i=0;i<miners;i++){
    const x = baseX + i*spacing;
    const active = i===vizState.winner;
    drawNode(x, topY, 26, 'PC', active || vizState.winner===-1);
    vizState.nonces[i] = (vizState.nonces[i] + (2+Math.random()*6))|0;
    ctx.fillStyle = active ? COLORS.green : '#888888';
    ctx.font='9px "Share Tech Mono"';
    ctx.fillText('nonce:'+ (vizState.nonces[i]%9999), x, topY+40);
  }

  if(vizState.winner===-1 && t%140<2){
    vizState.winner = Math.floor(Math.random()*miners);
    vizState.winTimer = 60;
    pushBlock(COLORS.green); // Add to chain
  }
  if(vizState.winner>-1){
    vizState.winTimer--;
    const x = baseX + vizState.winner*spacing;
    ctx.strokeStyle=COLORS.green; ctx.lineWidth=1.5;
    
    // Draw line from winner to newest block
    const blockX = W/2 + 60 + vizState.chainOffset;
    ctx.beginPath(); ctx.moveTo(x,topY+26); ctx.lineTo(blockX, H-40); ctx.stroke();
    
    if(vizState.winTimer<=0){ vizState.winner=-1; }
  }
  drawDynamicChain();
}

function animPos(t){
  const n=5;
  if(!vizState.stakes) vizState.stakes = [8,20,12,30,15];
  if(!vizState.angle) vizState.angle=0;
  if(vizState.selected===undefined) vizState.selected=-1;
  if(!vizState.timer) vizState.timer=0;

  ctx.clearRect(0,0,W,H);
  const cx=W/2, cy=75, R=50;
  const total = vizState.stakes.reduce((a,b)=>a+b,0);
  let startAngle=-Math.PI/2;
  
  if (vizState.timer < 80 || vizState.timer > 200) {
    vizState.angle += 0.15; // Spinning faster during selection phase
    vizState.selected = -1; // Reset selection visually
  }

  vizState.stakes.forEach((s,i)=>{
    const sweep = (s/total)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,R,startAngle,startAngle+sweep);
    ctx.closePath();
    ctx.fillStyle = (vizState.timer >= 80 && i===vizState.selected) ? 'rgba(46,125,50,.3)' : `hsla(0,70%,55%,${0.15+i*0.08})`;
    ctx.fill();
    ctx.strokeStyle = (vizState.timer >= 80 && i===vizState.selected) ? COLORS.green : COLORS.dim;
    ctx.stroke();
    startAngle += sweep;
  });

  const px = cx + R*1.3*Math.cos(vizState.angle);
  const py = cy + R*1.3*Math.sin(vizState.angle);
  ctx.strokeStyle=COLORS.magenta; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(px,py); ctx.stroke();

  vizState.timer++;
  
  if(vizState.timer === 80){
    // Lock in a selection
    let r = Math.random()*total, acc=0;
    for(let i=0;i<n;i++){ acc+=vizState.stakes[i]; if(r<=acc){ vizState.selected=i; break; } }
    
    // Snap the needle to the center of the selected slice
    let angleSum = -Math.PI/2;
    for(let i=0;i<vizState.selected;i++) {
      angleSum += (vizState.stakes[i]/total)*Math.PI*2;
    }
    const sliceSweep = (vizState.stakes[vizState.selected]/total)*Math.PI*2;
    vizState.angle = angleSum + sliceSweep/2;
  }

  if (vizState.timer === 150) {
    pushBlock(COLORS.green); // Block is finalized and pushed
  }

  if (vizState.timer > 220) {
    vizState.timer = 0; // Restart cycle
  }
  
  ctx.font='10px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink; ctx.textAlign='center';
  if (vizState.timer < 80) {
    ctx.fillText('Spinning Lottery to Select Validator...', cx, cy+R+22);
  } else if (vizState.timer >= 80 && vizState.timer < 150) {
    ctx.fillStyle = COLORS.green;
    ctx.fillText(`Validator ${vizState.selected+1} Wins & Proposes Block`, cx, cy+R+22);
  } else {
    ctx.fillStyle = COLORS.green;
    ctx.fillText(`Block Confirmed by Committee`, cx, cy+R+22);
  }
  drawDynamicChain();
}

function animDpos(t){
  const voters=8, delegates=3;
  const cx=W/2, cy=55;
  if(vizState.turn===undefined){ vizState.turn=0; vizState.timer=0; }
  ctx.clearRect(0,0,W,H);
  
  for(let i=0;i<voters;i++){
    const a = (i/voters)*Math.PI*2;
    const x = cx + Math.cos(a)*95, y = cy+30 + Math.sin(a)*30;
    drawNode(x,y,10,'',false);
    
    // Draw lines from voters to the current active delegate to represent "backing"
    if (vizState.timer < 50) {
       ctx.strokeStyle = 'rgba(0,0,0,0.05)';
       ctx.beginPath();
       ctx.moveTo(x, y);
       ctx.lineTo(cx - 90 + vizState.turn*90, cy);
       ctx.stroke();
    }
  }
  
  const dSpacing = 90;
  for(let i=0;i<delegates;i++){
    const x = cx - dSpacing + i*dSpacing;
    const active = (i===vizState.turn);
    drawNode(x, cy, 24, 'D'+(i+1), active);
    
    if(active) {
       ctx.fillStyle = COLORS.green;
       ctx.font='10px "Share Tech Mono"'; ctx.textAlign='center';
       if (vizState.timer < 50) {
         ctx.fillText('Verifying...', x, cy-35);
       } else if (vizState.timer >= 50 && vizState.timer < 100) {
         ctx.fillText('Proposing Block', x, cy-35);
       } else {
         ctx.fillText('Confirmed', x, cy-35);
       }
    }
  }
  ctx.font='10px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink; ctx.textAlign='center';
  ctx.fillText('Delegates take round-robin turns', cx, cy+80);

  vizState.timer++;
  
  if(vizState.timer === 50) {
    pushBlock(COLORS.magenta);
  }
  
  if(vizState.timer > 140){ 
    vizState.timer=0; 
    vizState.turn=(vizState.turn+1)%delegates; 
  }
  drawDynamicChain();
}

function animPoa(t){
  const n=4;
  const cx=W/2, cy=65, spacing=90;
  if(vizState.turn===undefined){ vizState.turn=0; vizState.timer=0; }
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<n;i++){
    const x = cx - spacing*1.5 + i*spacing;
    drawNode(x,cy,24,'A'+(i+1), i===vizState.turn);
    ctx.fillStyle = i===vizState.turn?COLORS.green:'#888888';
    ctx.font='8px "Share Tech Mono"'; ctx.textAlign='center';
    ctx.fillText('Authority Node', x, cy+38);
    
    if(i===vizState.turn) {
       ctx.font='10px "Share Tech Mono"';
       if (vizState.timer < 50) {
         ctx.fillText('Verifying...', x, cy-35);
       } else if (vizState.timer >= 50 && vizState.timer < 100) {
         ctx.fillText('Proposing Block', x, cy-35);
       } else {
         ctx.fillText('Confirmed', x, cy-35);
       }
    }
  }
  ctx.font='10px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink;
  ctx.fillText('Pre-approved Authority Nodes take turns signing blocks', cx, cy+65);
  
  vizState.timer++;
  
  if(vizState.timer === 50) {
    pushBlock(COLORS.cyan);
  }
  
  if(vizState.timer > 140){ 
    vizState.timer=0; 
    vizState.turn=(vizState.turn+1)%n; 
  }
  drawDynamicChain();
}

function animPoh(t){
  ctx.clearRect(0,0,W,H);
  const y=70;
  if(!vizState.offset) vizState.offset=0;
  if(!vizState.timer) vizState.timer=0;
  
  vizState.offset += 2.4;
  const seg=26;
  ctx.font='10px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink; ctx.textAlign='center';
  ctx.fillText('Continuous VDF hashing = verifiable passage of time', W/2, 24);
  
  for(let x = -seg + (vizState.offset%seg); x<W; x+=seg){
    const idx = Math.floor((x+vizState.offset)/seg);
    const h = 14 + (idx%5)*3;
    ctx.strokeStyle = 'rgba(211,47,47,'+(0.3+ (idx%7)*0.08)+')';
    ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(x,y-h); ctx.lineTo(x,y+h); ctx.stroke();
  }
  
  ctx.strokeStyle='rgba(0,0,0,.15)';
  ctx.beginPath(); ctx.moveTo(20,y); ctx.lineTo(W-20,y); ctx.stroke();
  
  ctx.fillStyle=COLORS.magenta;
  ctx.beginPath(); ctx.arc(W/2, y, 5,0,Math.PI*2); ctx.fill();
  
  vizState.timer++;
  
  ctx.font='10px "Share Tech Mono"';
  if(vizState.timer < 50) {
    ctx.fillStyle = COLORS.magenta;
    ctx.fillText('VDF Hashing...', W/2, y+24);
  } else if (vizState.timer >= 50 && vizState.timer < 90) {
    ctx.fillStyle = COLORS.green;
    ctx.fillText('Event Timestamped!', W/2, y+24);
  } else {
    ctx.fillStyle = COLORS.green;
    ctx.fillText('Block Appended', W/2, y+24);
  }

  if(vizState.timer === 90) {
    pushBlock(COLORS.magenta);
  }
  
  if(vizState.timer > 140) {
    vizState.timer = 0;
  }
  
  drawDynamicChain();
}

function animPbft(t){
  const n=4;
  const cx=W/2, cy=110, R=55;
  if(vizState.timer===undefined){ vizState.phase=0; vizState.timer=0; }
  ctx.clearRect(0,0,W,H);
  const pos = [];
  for(let i=0;i<n;i++){
    const a = -Math.PI/2 + i*(Math.PI*2/n);
    pos.push([cx+R*Math.cos(a), cy+R*Math.sin(a)]);
  }
  const phaseColors=[COLORS.cyan, COLORS.magenta, COLORS.green];
  const labels=['Phase: Pre-prepare (Leader broadcasts)','Phase: Prepare (Nodes cross-verify)','Phase: Commit (2/3 majority reached)'];
  
  // Draw faint network lines
  ctx.strokeStyle = 'rgba(0,0,0,0.05)';
  ctx.lineWidth=2;
  for(let i=0;i<n;i++) {
    for(let j=i+1;j<n;j++){
      ctx.beginPath(); ctx.moveTo(pos[i][0],pos[i][1]); ctx.lineTo(pos[j][0],pos[j][1]); ctx.stroke(); 
    }
  }
  
  // Draw message pulses
  const p = (vizState.timer / 80); // 0 to 1
  ctx.fillStyle = phaseColors[vizState.phase];
  
  if(vizState.phase===0){
    // Leader broadcasts to all
    for(let i=1; i<n; i++) {
      let px = pos[0][0] + (pos[i][0] - pos[0][0]) * p;
      let py = pos[0][1] + (pos[i][1] - pos[0][1]) * p;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI*2); ctx.fill();
    }
  } else if (vizState.phase===1) {
    // Cross verification (everyone to everyone)
    for(let i=0; i<n; i++) {
      for(let j=0; j<n; j++) {
        if (i !== j && i !== 0) { // Nodes 1,2,3 broadcast
          let px = pos[i][0] + (pos[j][0] - pos[i][0]) * p;
          let py = pos[i][1] + (pos[j][1] - pos[i][1]) * p;
          ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2); ctx.fill();
        }
      }
    }
  } else if (vizState.phase===2) {
    // Commit to all
    for(let i=0; i<n; i++) {
      for(let j=0; j<n; j++) {
        if (i !== j) {
          let px = pos[i][0] + (pos[j][0] - pos[i][0]) * p;
          let py = pos[i][1] + (pos[j][1] - pos[i][1]) * p;
          ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2); ctx.fill();
        }
      }
    }
    // Block finalized indicator (pulse in center)
    ctx.globalAlpha = Math.sin(p * Math.PI);
    ctx.beginPath(); ctx.arc(cx, cy, 15 + 25*p, 0, Math.PI*2); 
    ctx.strokeStyle = COLORS.green; ctx.stroke();
    ctx.globalAlpha = 1;
  }
  
  for(let i=0;i<n;i++) {
    let isActive = false;
    if (vizState.phase === 0 && i === 0) isActive = true;
    if (vizState.phase === 1 && i !== 0) isActive = true;
    if (vizState.phase === 2) isActive = true;
    drawNode(pos[i][0], pos[i][1], 20, i===0?'L':'N'+i, isActive);
  }
  
  ctx.font='11px "Share Tech Mono"'; ctx.fillStyle=phaseColors[vizState.phase]; ctx.textAlign='center';
  ctx.fillText(labels[vizState.phase], cx, cy+R+25);
  
  vizState.timer++;
  if(vizState.timer>80){
    vizState.timer=0;
    vizState.phase=(vizState.phase+1)%3;
    if(vizState.phase === 0) {
      pushBlock(COLORS.green); // block added on commit finish
    }
  }
  drawDynamicChain();
}

function animPospace(t){
  const cx=W/2, cy=120;
  if(!vizState.disks) {
    vizState.disks = [100, 500, 1000];
  }
  if(vizState.timer === undefined) {
    vizState.phase = 0; 
    vizState.timer = 0; 
    vizState.winner = -1;
  }
  
  ctx.clearRect(0,0,W,H);
  
  const netY = 40;
  const pos = [
    [cx - 110, cy],
    [cx, cy],
    [cx + 110, cy]
  ];
  
  const phaseColors = [COLORS.dim, COLORS.amber, COLORS.cyan, COLORS.green];
  const phaseLabels = [
    "Idle: Waiting for Challenge",
    "Challenge Broadcasted",
    "Scanning Plots...",
    "Best Proof Found!"
  ];
  
  // Draw connections
  for(let i=0; i<3; i++){
    ctx.beginPath();
    ctx.moveTo(cx, netY);
    ctx.lineTo(pos[i][0], pos[i][1]);
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Pulses during broadcast
    if (vizState.phase === 1) {
      let p = (vizState.timer / 80);
      let px = cx + (pos[i][0] - cx) * p;
      let py = netY + (pos[i][1] - netY) * p;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI*2);
      ctx.fillStyle = COLORS.amber;
      ctx.fill();
    }
  }
  
  // Draw Network Node
  drawNode(cx, netY, 20, 'NET', vizState.phase === 1);

  ctx.font='11px "Share Tech Mono"'; ctx.textAlign='center';
  ctx.fillStyle=phaseColors[vizState.phase];
  ctx.fillText("Phase: " + phaseLabels[vizState.phase], cx, cy + 60);

  // Draw Disks
  for(let i=0; i<3; i++){
    const x = pos[i][0];
    const y = pos[i][1];
    const isWinner = (vizState.phase === 3 && i === vizState.winner);
    const isScanning = (vizState.phase === 2);
    const isActive = isWinner || isScanning;
    
    // Draw disk base
    drawNode(x, y, 26, 'Disk', isActive);
    
    // Draw scanning arc
    if (isScanning) {
      ctx.beginPath();
      ctx.arc(x, y, 32, (t/10 + i) % (Math.PI*2), (t/10 + i) % (Math.PI*2) + Math.PI/2);
      ctx.strokeStyle = COLORS.cyan;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    ctx.fillStyle = isWinner ? COLORS.green : (isScanning ? COLORS.cyan : '#888');
    ctx.font='10px "Share Tech Mono"'; 
    ctx.fillText(vizState.disks[i] + ' Plots', x, y + 42);
    
    if(isWinner) {
      ctx.fillStyle = COLORS.green;
      ctx.fillText('Winner', x, y - 38);
      // Winner sends block down
      ctx.strokeStyle = COLORS.green;
      ctx.beginPath();
      ctx.moveTo(x, y + 26);
      ctx.lineTo(cx, cy + 45); 
      ctx.stroke();
    }
  }
  
  vizState.timer++;
  if(vizState.timer > 80) {
    vizState.timer = 0;
    vizState.phase++;
    
    if(vizState.phase === 2) {
      const r = Math.random() * 1600;
      if (r < 100) vizState.winner = 0;
      else if (r < 600) vizState.winner = 1;
      else vizState.winner = 2;
    }
    
    if(vizState.phase === 3) {
       pushBlock(COLORS.green);
    }
    
    if(vizState.phase > 3) {
      vizState.phase = 0;
      vizState.winner = -1;
    }
  }
  
  drawDynamicChain();
}

function animPob(t){
  const cx=W/2, cy=60;
  if(!vizState.powers) vizState.powers=[500,200,800];
  if(vizState.winner===undefined){ vizState.winner=-1; vizState.timer=0; }
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<3;i++){
    const x = cx - 90 + i*90;
    const active = i===vizState.winner;
    drawNode(x, cy, 22, 'N'+(i+1), active);
    vizState.powers[i] = Math.max(0, vizState.powers[i]-0.2); // decaying power
    if(Math.random()<0.01) vizState.powers[i]+=300; // random burn
    ctx.fillStyle = active ? COLORS.green : '#888';
    ctx.font='9px "Share Tech Mono"'; ctx.textAlign='center';
    ctx.fillText('Power:'+(vizState.powers[i]|0), x, cy+36);
  }
  ctx.font='10px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink; ctx.textAlign='center';
  ctx.fillText('Burning coins grants decaying virtual mining power', cx, cy+65);
  
  vizState.timer++;
  if(vizState.timer>80){
    vizState.timer=0;
    let max=0, mIdx=0;
    for(let i=0;i<3;i++){ if(vizState.powers[i]>max){ max=vizState.powers[i]; mIdx=i; } }
    vizState.winner = mIdx;
    pushBlock(COLORS.red);
  }
  drawDynamicChain();
}

function animPoet(t){
  const cx=W/2, cy=60;
  if(!vizState.timers) vizState.timers=[80,120,45,200];
  if(vizState.winner===undefined){ vizState.winner=-1; vizState.timer=0; }
  ctx.clearRect(0,0,W,H);
  let justWon = -1;
  for(let i=0;i<4;i++){
    const x = cx - 120 + i*80;
    const active = i===vizState.winner;
    drawNode(x,cy,22,'TEE', active);
    if(vizState.winner === -1) {
      vizState.timers[i] = Math.max(0, vizState.timers[i]-1);
      if(vizState.timers[i]===0) justWon = i;
    }
    ctx.fillStyle = active ? COLORS.green : '#888';
    ctx.font='9px "Share Tech Mono"'; ctx.textAlign='center';
    ctx.fillText('wait:'+(vizState.timers[i]|0), x, cy+36);
  }
  ctx.font='10px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink; ctx.textAlign='center';
  ctx.fillText('Trusted Execution Environments enforce fair random wait times', cx, cy+65);
  
  if(justWon > -1) {
    vizState.winner = justWon;
    vizState.timer = 50;
    pushBlock(COLORS.amber);
  }
  
  if(vizState.winner>-1){
    vizState.timer--;
    if(vizState.timer<=0){
      vizState.winner=-1;
      vizState.timers = vizState.timers.map(()=>40+Math.random()*150|0);
    }
  }
  drawDynamicChain();
}

function animPoi(t){
  const cx=W/2, cy=65;
  if(!vizState.scores) vizState.scores=[34,89,12,56];
  if(vizState.winner===undefined){ vizState.winner=-1; vizState.timer=0; }
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<4;i++){
    const x = cx - 120 + i*80;
    const active = i===vizState.winner;
    drawNode(x, cy, 22, 'N'+(i+1), active);
    ctx.fillStyle = active ? COLORS.green : '#888';
    ctx.font='9px "Share Tech Mono"'; ctx.textAlign='center';
    ctx.fillText('Imp:'+vizState.scores[i], x, cy+36);
    if(active) ctx.fillText('Harvesting', x, cy-34);
  }
  ctx.font='10px "Share Tech Mono"'; ctx.fillStyle=COLORS.ink; ctx.textAlign='center';
  ctx.fillText('Network activity + stake = Importance Score for harvesting', cx, cy+65);
  
  vizState.timer++;
  if(vizState.timer>90){
    vizState.timer=0;
    let r = Math.random()*191, acc=0; // 191 is sum
    for(let i=0;i<4;i++){ acc+=vizState.scores[i]; if(r<=acc){ vizState.winner=i; break; } }
    pushBlock(COLORS.green);
  }
  drawDynamicChain();
}

const ANIM = {pow:animPow,pos:animPos,dpos:animDpos,poa:animPoa,poh:animPoh,pbft:animPbft,pospace:animPospace,pob:animPob,poet:animPoet,poi:animPoi};

let frame=0;
function loop(){
  frame++;
  const fn = ANIM[vizAlgoId];
  if(fn) fn(frame);
  requestAnimationFrame(loop);
}

/* =========================================================
   INTRO CANVAS
========================================================= */
const icv = document.getElementById('introChain');
const ictx = icv ? icv.getContext('2d') : null;
let IW=0,IH=0;
function resizeIntro(){
  if(!icv || !ictx) return;
  const rect = icv.getBoundingClientRect();
  IW = rect.width; IH = rect.height || 150;
  icv.width = IW*DPR; icv.height=IH*DPR;
  ictx.setTransform(DPR,0,0,DPR,0,0);
}
window.addEventListener('resize', resizeIntro);

let introFrame=0;
function introLoop(){
  introFrame++;
  ictx.clearRect(0,0,IW,IH);
  const n=5, gap= Math.min(120,(IW-80)/n);
  const y = IH/2;
  const pulse = (introFrame%150)/150;
  for(let i=0;i<n;i++){
    const x = 50 + i*gap;
    const isNew = i===n-1;
    const glow = isNew ? (0.4+0.6*Math.sin(pulse*Math.PI*2*0+ (introFrame/20))) : 1;
    ictx.globalAlpha = isNew ? Math.min(1,0.3+pulse*2) : 1;
    ictx.fillStyle='rgba(0,0,0,.02)';
    ictx.fillRect(x-24,y-24,48,48);
    ictx.lineWidth = isNew?2:1.2;
    ictx.strokeStyle = isNew ? '#b71c1c':'#d32f2f';
    ictx.shadowColor = isNew?'#b71c1c':'#d32f2f';
    ictx.shadowBlur = isNew? 16:6;
    ictx.strokeRect(x-24,y-24,48,48);
    ictx.shadowBlur=0;
    ictx.font='9px "Share Tech Mono"'; ictx.fillStyle= isNew?'#b71c1c':'#5aa'; ictx.textAlign='center'; ictx.textBaseline='middle';
    ictx.fillText('#'+(i+1), x, y);
    ictx.globalAlpha=1;
    if(i>0){
      ictx.strokeStyle='rgba(211,47,47,.3)';
      ictx.beginPath(); ictx.moveTo(x-gap+24,y); ictx.lineTo(x-24,y); ictx.stroke();
    }
  }
  ictx.font='10px "Share Tech Mono"'; ictx.fillStyle='#7f93b3'; ictx.textAlign='center';
  ictx.fillText('each block stores a hash of the one before it — an unbroken chain of trust', IW/2, IH-14);
  requestAnimationFrame(introLoop);
}

/* =========================================================
   REVEAL ON SCROLL
========================================================= */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

/* =========================================================
   INIT
========================================================= */
window.addEventListener('load', ()=>{
  resizeCanvas();
  resizeIntro();
  if(cv) loop();
  if(icv) introLoop();
});
