/* ==========================================================================
   Nexflow - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {



  // --- 2. Code Snippets & Language Tabs ---
  const codeSnippets = {
    python: `<div class="code-line"><span class="c-kw">import</span> requests</div>
<div class="code-line"> </div>
<div class="code-line">response = requests.<span class="c-fn">post</span>(</div>
<div class="code-line">  <span class="c-str">"https://api.nexflow.ai/v1/chat/completions"</span>,</div>
<div class="code-line">  headers={<span class="c-str">"Authorization"</span>: <span class="c-str">"Bearer nx_..."</span>},</div>
<div class="code-line">  json={</div>
<div class="code-line">    <span class="c-key">"model"</span>: <span class="c-str">"nexflow-auto"</span>,</div>
<div class="code-line">    <span class="c-key">"messages"</span>: [{<span class="c-key">"role"</span>: <span class="c-str">"user"</span>, <span class="c-key">"content"</span>: <span class="c-str">"Hello"</span>}]</div>
<div class="code-line">  }</div>
<div class="code-line">)</div>`,

    curl: `<div class="code-line"><span class="c-kw">curl</span> https://api.nexflow.ai/v1/chat/completions \\</div>
<div class="code-line">  -H <span class="c-str">"Authorization: Bearer nx_..."</span> \\</div>
<div class="code-line">  -H <span class="c-str">"Content-Type: application/json"</span> \\</div>
<div class="code-line">  -d <span class="c-str">'{</span></div>
<div class="code-line">    <span class="c-key">"model"</span>: <span class="c-str">"nexflow-auto"</span>,</div>
<div class="code-line">    <span class="c-key">"messages"</span>: [{<span class="c-key">"role"</span>: <span class="c-str">"user"</span>, <span class="c-key">"content"</span>: <span class="c-str">"Hello"</span>}]</div>
<div class="code-line">  <span class="c-str">}'</span></div>`,

    node: `<div class="code-line"><span class="c-kw">import</span> { Nexflow } <span class="c-kw">from</span> <span class="c-str">'@nexflow/sdk'</span>;</div>
<div class="code-line"> </div>
<div class="code-line"><span class="c-kw">const</span> client = <span class="c-kw">new</span> <span class="c-fn">Nexflow</span>({ apiKey: <span class="c-str">'nx_...'</span> });</div>
<div class="code-line"><span class="c-kw">const</span> completion = <span class="c-kw">await</span> client.chat.<span class="c-fn">create</span>({</div>
<div class="code-line">  <span class="c-key">model</span>: <span class="c-str">'nexflow-auto'</span>,</div>
<div class="code-line">  <span class="c-key">messages</span>: [{ <span class="c-key">role</span>: <span class="c-str">'user'</span>, <span class="c-key">content</span>: <span class="c-str">'Hello'</span> }],</div>
<div class="code-line">});</div>`,

    openai: `<div class="code-line"><span class="c-kw">from</span> openai <span class="c-kw">import</span> OpenAI</div>
<div class="code-line"> </div>
<div class="code-line">client = OpenAI(</div>
<div class="code-line">  base_url=<span class="c-str">"https://api.nexflow.ai/v1"</span>,</div>
<div class="code-line">  api_key=<span class="c-str">"nx_..."</span></div>
<div class="code-line">)</div>
<div class="code-line">completion = client.chat.completions.<span class="c-fn">create</span>(</div>
<div class="code-line">  model=<span class="c-str">"nexflow-auto"</span>,</div>
<div class="code-line">  messages=[{<span class="c-str">"role"</span>: <span class="c-str">"user"</span>, <span class="c-str">"content"</span>: <span class="c-str">"Hello"</span>}]</div>
<div class="code-line">)</div>`
  };

  const rawCodeTexts = {
    python: `import requests\n\nresponse = requests.post(\n  "https://api.nexflow.ai/v1/chat/completions",\n  headers={"Authorization": "Bearer nx_..."},\n  json={\n    "model": "nexflow-auto",\n    "messages": [{"role": "user", "content": "Hello"}]\n  }\n)`,
    curl: `curl https://api.nexflow.ai/v1/chat/completions \\\n  -H "Authorization: Bearer nx_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "nexflow-auto",\n    "messages": [{"role": "user", "content": "Hello"}]\n  }'`,
    node: `import { Nexflow } from '@nexflow/sdk';\n\nconst client = new Nexflow({ apiKey: 'nx_...' });\nconst completion = await client.chat.create({\n  model: 'nexflow-auto',\n  messages: [{ role: 'user', content: 'Hello' }],\n});`,
    openai: `from openai import OpenAI\n\nclient = OpenAI(\n  base_url="https://api.nexflow.ai/v1",\n  api_key="nx_..."\n)\ncompletion = client.chat.completions.create(\n  model="nexflow-auto",\n  messages=[{"role": "user", "content": "Hello"}]\n)`
  };

  let currentLang = 'python';
  const codeBox = document.getElementById('code-snippet-box');
  const codeTabs = document.querySelectorAll('.code-tab');
  const btnCopyCode = document.getElementById('btn-copy-code');

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.getAttribute('data-lang');
      currentLang = lang;
      if (codeSnippets[lang]) {
        codeBox.style.opacity = '0';
        setTimeout(() => {
          codeBox.innerHTML = codeSnippets[lang];
          codeBox.style.opacity = '1';
        }, 120);
      }
    });
  });

  btnCopyCode.addEventListener('click', () => {
    const textToCopy = rawCodeTexts[currentLang] || '';
    navigator.clipboard.writeText(textToCopy).then(() => {
      const span = btnCopyCode.querySelector('span');
      const orig = span.textContent;
      span.textContent = 'Copied!';
      btnCopyCode.style.color = '#34D399';
      setTimeout(() => {
        span.textContent = orig;
        btnCopyCode.style.color = '';
      }, 1500);
    });
  });

  // --- 3. Interactive Nexflow Chat ---
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatModelSelect = document.getElementById('chat-model-select');
  const btnFocusChat = document.getElementById('btn-focus-chat');

  if (btnFocusChat) {
    btnFocusChat.addEventListener('click', () => {
      chatInput.focus();
      chatInput.classList.add('pulse-focus');
      setTimeout(() => chatInput.classList.remove('pulse-focus'), 1000);
    });
  }

  // Model cards click selects model in chat
  document.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('click', () => {
      const modelName = card.getAttribute('data-model');
      showToast(`Selected model: ${modelName}`);
      if (modelName.includes('Claude')) chatModelSelect.value = 'claude-3-5-sonnet';
      else if (modelName.includes('GPT')) chatModelSelect.value = 'gpt-4o';
      else if (modelName.includes('Gemini')) chatModelSelect.value = 'gemini-1-5-pro';
      else if (modelName.includes('Llama')) chatModelSelect.value = 'llama-3-1';
      else if (modelName.includes('Grok')) chatModelSelect.value = 'grok-2';
    });
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg-user';
    userMsg.textContent = query;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Append Assistant Loading Bubble
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg-ai';
    const selectedModelName = chatModelSelect.options[chatModelSelect.selectedIndex].text;
    
    aiMsg.innerHTML = `
      <img src="nexflow_logo_transparent.png" alt="Nexflow AI" class="ai-avatar">
      <div class="ai-bubble">
        <span style="color: #6366F1; font-weight: 700;">[${selectedModelName}]</span>
        <div class="typing-placeholder" style="margin-top: 4px;">Routing request via unified endpoint...</div>
      </div>
    `;
    chatMessages.appendChild(aiMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate smart stream reply
    setTimeout(() => {
      const bubble = aiMsg.querySelector('.ai-bubble');
      bubble.innerHTML = `
        <span style="color: #6366F1; font-weight: 700;">[${selectedModelName}]</span>
        <div style="margin-top: 4px;">Connected with <strong>nexflow-auto</strong>. Zero cold start, 99.99% uptime. You can query all frontier models with an identical schema!</div>
      `;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  });

  // --- 4. Billing Toggle (Monthly / Yearly) ---
  const btnMonthly = document.getElementById('btn-billing-monthly');
  const btnYearly = document.getElementById('btn-billing-yearly');
  const priceStarter = document.getElementById('price-starter');
  const priceBuilder = document.getElementById('price-builder');

  btnMonthly.addEventListener('click', () => {
    btnMonthly.classList.add('active');
    btnYearly.classList.remove('active');
    priceStarter.textContent = '$5';
    priceBuilder.textContent = '$20';
  });

  btnYearly.addEventListener('click', () => {
    btnYearly.classList.add('active');
    btnMonthly.classList.remove('active');
    priceStarter.textContent = '$4';
    priceBuilder.textContent = '$16';
  });

  // --- 5. Usage Dashboard Period Selector ---
  const usageSelect = document.getElementById('usage-period-select');
  const statRequests = document.getElementById('stat-requests');
  const statTokens = document.getElementById('stat-tokens');
  const statSpent = document.getElementById('stat-spent');
  const statModels = document.getElementById('stat-models');
  const donutVal = document.getElementById('donut-val');
  const donutCircle = document.getElementById('donut-circle');
  const barChartBars = document.getElementById('bar-chart-bars');

  const usageData = {
    month: {
      req: '128,492',
      tokens: '42.8M',
      spent: '$18.42',
      models: '12',
      pct: 72,
      bars: [35, 50, 40, 65, 55, 80, 45, 70, 90, 85, 60, 75]
    },
    week: {
      req: '31,820',
      tokens: '9.4M',
      spent: '$4.15',
      models: '8',
      pct: 86,
      bars: [20, 35, 60, 45, 70, 85, 95, 75, 50, 65, 40, 55]
    },
    year: {
      req: '1,420,890',
      tokens: '482.1M',
      spent: '$218.50',
      models: '16',
      pct: 44,
      bars: [70, 85, 90, 65, 75, 80, 95, 85, 90, 100, 92, 88]
    }
  };

  usageSelect.addEventListener('change', () => {
    const period = usageSelect.value;
    const d = usageData[period] || usageData.month;
    statRequests.textContent = d.req;
    statTokens.textContent = d.tokens;
    statSpent.textContent = d.spent;
    statModels.textContent = d.models;
    donutVal.textContent = d.pct + '%';

    // 251.2 is 2 * PI * 40
    const offset = 251.2 * (1 - d.pct / 100);
    donutCircle.style.strokeDashoffset = offset;

    // Animate bars
    const barElements = barChartBars.querySelectorAll('.chart-bar');
    barElements.forEach((bar, idx) => {
      bar.style.height = (d.bars[idx] || 50) + '%';
    });
  });

  const btnViewDashboard = document.getElementById('btn-view-dashboard');
  if (btnViewDashboard) {
    btnViewDashboard.addEventListener('click', () => {
      showToast('Opening unified analytics console...');
    });
  }

  // --- 6. Web3 Wallet Modal & Claim Credits ---
  const walletModal = document.getElementById('wallet-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const openWalletBtns = document.querySelectorAll('.btn-open-wallet');
  const walletStatusBadge = document.getElementById('wallet-status-badge');
  const btnClaimCredits = document.getElementById('btn-claim-credits');
  const valCreditsGen = document.getElementById('val-credits-generated');
  const valAvailClaim = document.getElementById('val-available-claim');
  const btnLearnMore = document.getElementById('btn-learn-more');

  let isWalletConnected = false;

  openWalletBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isWalletConnected) {
        showToast('Wallet already connected: 0x71C...4e92');
      } else {
        walletModal.classList.add('active');
      }
    });
  });

  btnCloseModal.addEventListener('click', () => {
    walletModal.classList.remove('active');
  });

  walletModal.addEventListener('click', (e) => {
    if (e.target === walletModal) walletModal.classList.remove('active');
  });

  document.querySelectorAll('.wallet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-wallet');
      isWalletConnected = true;
      walletModal.classList.remove('active');
      walletStatusBadge.textContent = '0x71C...4e92';
      walletStatusBadge.style.color = '#16A34A';
      walletStatusBadge.style.background = 'rgba(22, 163, 74, 0.1)';
      showToast(`Connected to ${name} on Arc!`);
    });
  });

  btnClaimCredits.addEventListener('click', () => {
    if (!isWalletConnected) {
      walletModal.classList.add('active');
      showToast('Please connect wallet first to claim credits');
      return;
    }

    if (valAvailClaim.textContent === '$0.00') {
      showToast('No pending credits to claim right now.');
      return;
    }

    // Process claim
    valCreditsGen.textContent = '$20.69';
    valAvailClaim.textContent = '$0.00';
    btnClaimCredits.textContent = 'Claimed!';
    btnClaimCredits.style.opacity = '0.7';
    showToast('Success! $8.21 in API credits credited to your account.');
  });

  if (btnLearnMore) {
    btnLearnMore.addEventListener('click', () => {
      showToast('Arc: Gasless sub-second staking & credit rewards.');
    });
  }

  // --- 7. Newsletter Subscription & Toast Utility ---
  const newsletterForm = document.getElementById('newsletter-form');
  const toastBox = document.getElementById('toast-notification');
  let toastTimer = null;

  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toastBox.textContent = msg;
    toastBox.classList.add('show');
    toastTimer = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 2800);
  }

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input.value) {
      showToast("You're subscribed to Nexflow product updates!");
      input.value = '';
    }
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.style.transition = 'box-shadow 0.4s ease';
        targetEl.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.4)';
        setTimeout(() => {
          targetEl.style.boxShadow = '';
        }, 1200);
      }
    });
  });

});
