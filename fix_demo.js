const fs = require('fs');
const path = require('path');
const demoPath = path.join(__dirname, 'demo.js');
let content = fs.readFileSync(demoPath, 'utf8');

if (!content.includes('function checkChainValidity')) {
  const func = `
function checkChainValidity(blocks) {
  blocks.forEach(blk => {
    if (blk.signed) {
      if (blk.hashEl.value === blk.validHash) {
        blk.blockEl.classList.remove('invalid');
        blk.blockEl.style.borderColor = 'var(--green)';
        blk.btn.textContent = blk.validBtnText;
        blk.btn.style.background = 'var(--green)';
        blk.btn.style.color = 'var(--ink)';
      } else {
        blk.blockEl.classList.add('invalid');
        blk.blockEl.style.borderColor = 'var(--red)';
        blk.btn.textContent = '❌ Chain Broken';
        blk.btn.style.background = 'transparent';
        blk.btn.style.color = 'var(--red)';
      }
    }
  });
}
`;
  content = content.replace('function initPowDemo(container, desc) {', func + '\nfunction initPowDemo(container, desc) {');
}

// 2. Insert validHash assignment before enabling the next block
content = content.replace(/(\/\/ Enable next block\s+if\(i\+1 < blocks\.length\))/g, 'b.validHash = b.hashEl.value; b.validBtnText = b.btn.textContent;\n      $1');

// 3. Insert checkChainValidity call inside the dataEl input listeners
content = content.replace(/(blocks\[j\]\.prevEl\.value = blocks\[j-1\]\.hashEl\.value;\s+await calculateHash\(blocks\[j\]\);\s+\}\s+\})/g, '$1\n        checkChainValidity(blocks);');

fs.writeFileSync(demoPath, content);
console.log('demo.js updated successfully!');
