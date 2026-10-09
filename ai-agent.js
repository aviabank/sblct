/* Avia — Scripted AI Bot for €SBLCT Standby Letter of Credit Token */
(function () {
  'use strict';
  var state = { isOpen: false };
  function el(id) { return document.getElementById(id); }

  var KB = {
    'what': {
      title: 'What is €SBLCT?',
      answer: [
        '**€SBLCT (Standby Letter of Credit Token)** — the guarantee layer of AviaTrust on Solana.',
        '',
        '€SBLCT represents a **Standby Letter of Credit** (SBLC) — a bank instrument used as a payment guarantee in international trade.',
        '',
        '**What it does:**',
        '· Applicant obtains SBLC from issuing bank',
        '· SBLC recorded on-chain as €SBLCT',
        '· Beneficiary gets guarantee of payment',
        '· If conditions met — payment released',
        '',
        '**Conditions (ISP98):**',
        '· Default condition',
        '· Expiration date',
        '· Amendment clause',
        '',
        '**Important:** €SBLCT is a **digital representation** of an SBLC. It is **not a bank-issued guarantee**.',
        '',
        '📄 Contract: `SBLCTContractAddressHere`',
        '⛓ Chain: Solana (Token-2022, 1% transfer fee)'
      ].join('\n')
    },
    'buy': {
      title: 'How to buy €SBLCT?',
      answer: [
        '**Buy €SBLCT on Solana:**',
        '',
        '**1. Jupiter**',
        '→ https://jup.ag/tokens/SBLCTContractAddressHere',
        '',
        '**2. OpenSea**',
        '→ https://opensea.io/token/solana/SBLCTContractAddressHere',
        '',
        '**3. Binance Web3**',
        '→ https://app.binance.com/uni-qr/web3-token-details?tokenCA=SBLCTContractAddressHere',
        '',
        '💡 Recommend Jupiter for lowest slippage.'
      ].join('\n')
    },
    'contract': {
      title: 'Contract & Pool',
      answer: [
        '**€SBLCT Contract (Solana)**',
        '',
        '`SBLCTContractAddressHere`',
        '',
        '⚠️ Always verify contract before buying.',
        '',
        '**Verify on Solscan once live.**'
      ].join('\n')
    },
    'price': {
      title: 'Price & Target',
      answer: [
        '**€SBLCT Price**',
        '',
        '· Launch price: **€0.01**',
        '· Community target: **×100 → €1.00**',
        '',
        '⚠️ The ×100 is a community-stated target, not a promise.'
      ].join('\n')
    },
    'sblc': {
      title: 'What is an SBLC?',
      answer: [
        '**Standby Letter of Credit (SBLC)** — a bank guarantee used in international trade.',
        '',
        '**How the traditional SBLC works:**',
        '1. Applicant (buyer) requests SBLC from issuing bank',
        '2. Issuing bank issues guarantee to beneficiary (seller)',
        '3. If applicant defaults — bank pays beneficiary',
        '4. If no default — SBLC expires unused',
        '',
        '**€SBLCT tokenizes this flow:**',
        '· SBLC recorded on-chain',
        '· Conditions verified by smart contract',
        '· ISP98 compliant structure',
        '· Bank of America Merrill Lynch + Microsoft pioneered blockchain SBLC in 2016',
        '',
        '⚠️ €SBLCT is a digital representation, not a bank-issued guarantee.'
      ].join('\n')
    },
    'ecosystem': {
      title: 'What is AviaTrust?',
      answer: [
        '**AviaTrust — aviation tokenization ecosystem on Solana.**',
        '',
        '**Financial layer:**',
        '· **€ESCR** — Escrow (trust layer)',
        '· **€DLCT** — Tokenized DLC (trade finance)',
        '· **€SBLCT** — Standby LC Token (you are here)',
        '· **€BRKR** — Broker Commission Protection',
        '',
        '**Aircraft layer (10 tokens):**',
        '€B787 · €A350 · €C929 · €A220 · €E195',
        '€737MAX10 · €FAXX · €F22 · €CRJ900 · €IL96',
        '',
        'Built on Solana for speed and low fees.'
      ].join('\n')
    },
    'risk': {
      title: 'Is €SBLCT risky?',
      answer: [
        '**Honest answer: YES.**',
        '',
        '**Known risks:**',
        '· Price volatility',
        '· Liquidity risk',
        '· Regulatory uncertainty — SBLC is a bank instrument',
        '',
        '**Important:** €SBLCT is a **digital representation** of an SBLC. It is **NOT a bank-issued guarantee**.',
        '',
        '**What reduces risk:**',
        '· Mint Authority disabled',
        '· Freeze Authority disabled',
        '',
        '⚠️ **Not financial advice.** Only invest what you can afford to lose.'
      ].join('\n')
    }
  };

  var SUGGESTIONS = [
    { key: 'what',      label: '🛡️ What is €SBLCT?' },
    { key: 'buy',       label: '🛒 How to buy?' },
    { key: 'contract',  label: '🔗 Contract' },
    { key: 'price',     label: '💰 Price & Target' },
    { key: 'sblc',      label: '📋 What is an SBLC?' },
    { key: 'ecosystem', label: '🌍 AviaTrust' },
    { key: 'risk',      label: '⚠️ Is it risky?' }
  ];

  function createUI() {
    var btn = document.createElement('button');
    btn.id = 'avia-btn';
    btn.className = 'avia-btn';
    btn.innerHTML = '<span class="avia-btn-icon">🛡️</span><span class="avia-btn-label">Avia</span>';
    document.body.appendChild(btn);

    var win = document.createElement('div');
    win.id = 'avia-window';
    win.className = 'avia-window';
    win.innerHTML = [
      '<div class="avia-header">',
      '  <div class="avia-header-left">',
      '    <img src="sblct_logo.png" alt="Avia" class="avia-avatar" onerror="this.style.display=\'none\'" />',
      '    <div>',
      '      <div class="avia-name">Avia</div>',
      '      <div class="avia-status">AI assistant · €SBLCT</div>',
      '    </div>',
      '  </div>',
      '  <button class="avia-close" id="avia-close">×</button>',
      '</div>',
      '<div class="avia-messages" id="avia-messages"></div>',
      '<div class="avia-suggestions" id="avia-suggestions"></div>',
      '<div class="avia-external">',
      '  <a href="https://jup.ag/tokens/SBLCTContractAddressHere" target="_blank">🔄 Jupiter</a>',
      '  <a href="https://t.me/aviatrust" target="_blank">📱 TG</a>',
      '  <a href="https://x.com/aviatrust" target="_blank">🐦 X</a>',
      '</div>',
      '<div class="avia-footer">Scripted assistant · Not financial advice</div>'
    ].join('');
    document.body.appendChild(win);

    el('avia-btn').addEventListener('click', toggle);
    el('avia-close').addEventListener('click', toggle);

    addMessage('agent', 'Hi! I am Avia — assistant for €SBLCT Standby LC Token. Pick a topic below.');
    renderSuggestions();
  }

  function renderSuggestions() {
    var box = el('avia-suggestions');
    if (!box) return;
    box.innerHTML = '';
    SUGGESTIONS.forEach(function (item) {
      var b = document.createElement('button');
      b.className = 'avia-suggestion';
      b.textContent = item.label;
      b.addEventListener('click', function () { showAnswer(item.key); });
      box.appendChild(b);
    });
  }

  function addMessage(role, text) {
    var box = el('avia-messages');
    if (!box) return;
    var msg = document.createElement('div');
    msg.className = 'avia-msg avia-msg-' + role;
    var bubble = document.createElement('div');
    bubble.className = 'avia-bubble';
    bubble.innerHTML = formatText(text);
    msg.appendChild(bubble);
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }

  function formatText(text) {
    var safe = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\n/g, '<br />');
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    return safe;
  }

  function showAnswer(key) {
    var item = KB[key];
    if (!item) { addMessage('agent', 'Sorry, no info on that.'); return; }
    addMessage('user', item.title);
    setTimeout(function () { addMessage('agent', item.answer); }, 250);
  }

  function toggle() {
    state.isOpen = !state.isOpen;
    var win = el('avia-window');
    var btn = el('avia-btn');
    if (state.isOpen) { win.classList.add('avia-open'); btn.classList.add('avia-btn-hidden'); }
    else { win.classList.remove('avia-open'); btn.classList.remove('avia-btn-hidden'); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createUI);
  else createUI();
})();
