document.addEventListener('DOMContentLoaded', () => {
  // Check theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  // Inject Header
  const headerHTML = `
    <header>
      <div class="brand" onclick="window.location.href='index.html'">
        <div class="mark"><span>CX</span></div>
        <div class="brand-text">CONSENSUS<b>//</b>EXPLORER</div>
      </div>
      <div style="display:flex; align-items:center; gap: 15px;">
        <nav class="tabs">
          <a href="index.html" id="nav-index">Overview</a>
          <a href="algorithm.html" id="nav-algo">Algorithms</a>
          <a href="compatibility.html" id="nav-matrix">Compatibility</a>
          <a href="comparison.html" id="nav-compare">Comparison</a>
        </nav>
        <button id="themeToggleBtn" onclick="toggleTheme()" style="background:transparent; border:1px solid var(--line); color:var(--ink); padding:6px 12px; border-radius:4px; cursor:pointer; font-family:'Share Tech Mono'; font-size:12px; transition: all 0.2s;">
          🌓 Theme
        </button>
      </div>
    </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  
  // Highlight active nav tab based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if(currentPath === 'index.html') document.getElementById('nav-index')?.classList.add('active');
  if(currentPath === 'algorithm.html') document.getElementById('nav-algo')?.classList.add('active');
  if(currentPath === 'compatibility.html') document.getElementById('nav-matrix')?.classList.add('active');
  if(currentPath === 'comparison.html') document.getElementById('nav-compare')?.classList.add('active');

  // Inject background layers
  const bgHTML = `
    <div class="bg-glow"></div>
    <div class="bg-grid"></div>
    <div class="scanlines"></div>
  `;
  document.body.insertAdjacentHTML('afterbegin', bgHTML);

  // If page contains an algo-rail container, build the sidebar
  const rail = document.getElementById('algoRail');
  if(rail) {
    const selectedAlgoId = getQueryParam('algo') || 'pow';
    let sidebarHTML = `<div class="sidebar-title">// SELECT ALGORITHM</div>`;
    
    ALGOS.forEach(a => {
      const isActive = a.id === selectedAlgoId ? ' active' : '';
      sidebarHTML += `
        <button class="algo-btn${isActive}" onclick="changeAlgorithm('${a.id}')">
          <div class="algo-badge">${a.code}</div>
          <div class="names"><b>${a.name}</b><span>${a.id.toUpperCase()}</span></div>
        </button>
      `;
    });
    
    rail.innerHTML = sidebarHTML;
  }
});

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

function changeAlgorithm(algoId) {
  const currentPath = window.location.pathname.split('/').pop() || 'algorithm.html';
  window.location.href = currentPath + '?algo=' + algoId;
}
