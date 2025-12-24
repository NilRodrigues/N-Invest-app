// investimentos.js - Arquivo completo

// Configuração
let investments = [];
let marketData = { selic: 0, ipca: 0 };
let investmentValues = {};
let periodFilter = 'month';

// Opções de investimentos
const investmentOptions = {
  fixed_selic: [
    { name: "Tesouro Selic 2027", rate: 100 }, { name: "CDB 100% CDI", rate: 100 }, { name: "CDB 105% CDI", rate: 105 },
    { name: "CDB 110% CDI", rate: 110 }, { name: "CDB 115% CDI", rate: 115 }, { name: "CDB 120% CDI", rate: 120 },
    { name: "CDB 125% CDI", rate: 125 }, { name: "CDB 130% CDI", rate: 130 }, { name: "LCI 85% CDI", rate: 85 },
    { name: "LCI 90% CDI", rate: 90 }, { name: "LCI 95% CDI", rate: 95 }, { name: "LCA 85% CDI", rate: 85 },
    { name: "LCA 90% CDI", rate: 90 }, { name: "LCA 95% CDI", rate: 95 }, { name: "LC 115% CDI", rate: 115 },
    { name: "LC 120% CDI", rate: 120 }, { name: "Debênture 120% CDI", rate: 120 }, { name: "Debênture 125% CDI", rate: 125 }
  ],
  fixed_ipca: [
    { name: "Tesouro IPCA+ 2029", rate: 5.5 }, { name: "Tesouro IPCA+ 2035", rate: 6.0 }, { name: "Tesouro IPCA+ 2045", rate: 6.2 },
    { name: "Tesouro IPCA+ 2055", rate: 6.3 }, { name: "CDB IPCA+ 3%", rate: 3.0 }, { name: "CDB IPCA+ 4%", rate: 4.0 },
    { name: "CDB IPCA+ 5%", rate: 5.0 }, { name: "CDB IPCA+ 6%", rate: 6.0 }, { name: "CDB IPCA+ 7%", rate: 7.0 },
    { name: "LCI IPCA+ 4%", rate: 4.0 }, { name: "LCI IPCA+ 5%", rate: 5.0 }, { name: "LCA IPCA+ 4%", rate: 4.0 },
    { name: "LCA IPCA+ 5%", rate: 5.0 }, { name: "Debênture IPCA+ 6%", rate: 6.0 }, { name: "Debênture IPCA+ 7%", rate: 7.0 },
    { name: "Debênture IPCA+ 8%", rate: 8.0 }, { name: "Debênture IPCA+ 9%", rate: 9.0 }
  ],
  stock: [
    { name: "Itaú Unibanco (ITUB4)", symbol: "ITUB4.SA" }, { name: "Bradesco (BBDC4)", symbol: "BBDC4.SA" }, { name: "Banco do Brasil (BBAS3)", symbol: "BBAS3.SA" },
    { name: "Santander (SANB11)", symbol: "SANB11.SA" }, { name: "BTG Pactual (BPAC11)", symbol: "BPAC11.SA" }, { name: "Nubank (NU)", symbol: "NU" },
    { name: "Petrobras (PETR4)", symbol: "PETR4.SA" }, { name: "Petrobras PN (PETR3)", symbol: "PETR3.SA" }, { name: "PetroRio (PRIO3)", symbol: "PRIO3.SA" },
    { name: "3R Petroleum (RRRP3)", symbol: "RRRP3.SA" }, { name: "Vale (VALE3)", symbol: "VALE3.SA" }, { name: "Gerdau (GGBR4)", symbol: "GGBR4.SA" },
    { name: "Usiminas (USIM5)", symbol: "USIM5.SA" }, { name: "CSN (CSNA3)", symbol: "CSNA3.SA" }, { name: "CSN Mineração (CMIN3)", symbol: "CMIN3.SA" },
    { name: "Metalúrgica Gerdau (GOAU4)", symbol: "GOAU4.SA" }, { name: "Magazine Luiza (MGLU3)", symbol: "MGLU3.SA" }, { name: "Via (VIIA3)", symbol: "VIIA3.SA" },
    { name: "Lojas Renner (LREN3)", symbol: "LREN3.SA" }, { name: "Carrefour Brasil (CRFB3)", symbol: "CRFB3.SA" }, { name: "Assaí (ASAI3)", symbol: "ASAI3.SA" },
    { name: "Pão de Açúcar (PCAR3)", symbol: "PCAR3.SA" }, { name: "Americanas (AMER3)", symbol: "AMER3.SA" }, { name: "C&A (CEAB3)", symbol: "CEAB3.SA" },
    { name: "Ambev (ABEV3)", symbol: "ABEV3.SA" }, { name: "JBS (JBSS3)", symbol: "JBSS3.SA" }, { name: "BRF (BRFS3)", symbol: "BRFS3.SA" },
    { name: "Marfrig (MRFG3)", symbol: "MRFG3.SA" }, { name: "M. Dias Branco (MDIA3)", symbol: "MDIA3.SA" }, { name: "Eletrobras (ELET3)", symbol: "ELET3.SA" },
    { name: "Eletrobras PNB (ELET6)", symbol: "ELET6.SA" }, { name: "Copel (CPLE6)", symbol: "CPLE6.SA" }, { name: "Cemig (CMIG4)", symbol: "CMIG4.SA" },
    { name: "Equatorial (EQTL3)", symbol: "EQTL3.SA" }, { name: "Engie Brasil (EGIE3)", symbol: "EGIE3.SA" }, { name: "CPFL Energia (CPFE3)", symbol: "CPFE3.SA" },
    { name: "Taesa (TAEE11)", symbol: "TAEE11.SA" }, { name: "AES Brasil (AESB3)", symbol: "AESB3.SA" }, { name: "Neoenergia (NEOE3)", symbol: "NEOE3.SA" },
    { name: "TIM (TIMS3)", symbol: "TIMS3.SA" }, { name: "Vivo (VIVT3)", symbol: "VIVT3.SA" }, { name: "Oi (OIBR3)", symbol: "OIBR3.SA" },
    { name: "MRV (MRVE3)", symbol: "MRVE3.SA" }, { name: "Cyrela (CYRE3)", symbol: "CYRE3.SA" }, { name: "Direcional (DIRR3)", symbol: "DIRR3.SA" },
    { name: "EZTec (EZTC3)", symbol: "EZTC3.SA" }, { name: "Trisul (TRIS3)", symbol: "TRIS3.SA" }, { name: "Even (EVEN3)", symbol: "EVEN3.SA" },
    { name: "JHSF (JHSF3)", symbol: "JHSF3.SA" }, { name: "WEG (WEGE3)", symbol: "WEGE3.SA" }, { name: "Embraer (EMBR3)", symbol: "EMBR3.SA" },
    { name: "Randon (RAPT4)", symbol: "RAPT4.SA" }, { name: "Marcopolo (POMO4)", symbol: "POMO4.SA" }, { name: "Tupy (TUPY3)", symbol: "TUPY3.SA" },
    { name: "Ferbasa (FESA4)", symbol: "FESA4.SA" }, { name: "Suzano (SUZB3)", symbol: "SUZB3.SA" }, { name: "Klabin (KLBN11)", symbol: "KLBN11.SA" },
    { name: "Irani (RANI3)", symbol: "RANI3.SA" }, { name: "Rede D'Or (RDOR3)", symbol: "RDOR3.SA" }, { name: "Hapvida (HAPV3)", symbol: "HAPV3.SA" },
    { name: "Fleury (FLRY3)", symbol: "FLRY3.SA" }, { name: "Qualicorp (QUAL3)", symbol: "QUAL3.SA" }, { name: "Intermédica (GNDI3)", symbol: "GNDI3.SA" },
    { name: "Azul (AZUL4)", symbol: "AZUL4.SA" }, { name: "Gol (GOLL4)", symbol: "GOLL4.SA" }, { name: "Rumo (RAIL3)", symbol: "RAIL3.SA" },
    { name: "CCR (CCRO3)", symbol: "CCRO3.SA" }, { name: "Ecorodovias (ECOR3)", symbol: "ECOR3.SA" }, { name: "Movida (MOVI3)", symbol: "MOVI3.SA" },
    { name: "Localiza (RENT3)", symbol: "RENT3.SA" }, { name: "JSL (JSLG3)", symbol: "JSLG3.SA" }, { name: "Cogna (COGN3)", symbol: "COGN3.SA" },
    { name: "Yduqs (YDUQ3)", symbol: "YDUQ3.SA" }, { name: "Ser Educacional (SEER3)", symbol: "SEER3.SA" }, { name: "Ânima (ANIM3)", symbol: "ANIM3.SA" },
    { name: "BB Seguridade (BBSE3)", symbol: "BBSE3.SA" }, { name: "Porto Seguro (PSSA3)", symbol: "PSSA3.SA" }, { name: "Sul América (SULA11)", symbol: "SULA11.SA" },
    { name: "IRB Brasil (IRBR3)", symbol: "IRBR3.SA" }, { name: "B3 (B3SA3)", symbol: "B3SA3.SA" }, { name: "Cielo (CIEL3)", symbol: "CIEL3.SA" },
    { name: "Iguatemi (IGTI11)", symbol: "IGTI11.SA" }, { name: "Multiplan (MULT3)", symbol: "MULT3.SA" }, { name: "BR Malls (BRML3)", symbol: "BRML3.SA" },
    { name: "Aliansce Sonae (ALSO3)", symbol: "ALSO3.SA" }, { name: "Natura &Co (NTCO3)", symbol: "NTCO3.SA" }, { name: "Hypera (HYPE3)", symbol: "HYPE3.SA" },
    { name: "Raia Drogasil (RADL3)", symbol: "RADL3.SA" }, { name: "Pague Menos (PGMN3)", symbol: "PGMN3.SA" }, { name: "Grupo Mateus (GMAT3)", symbol: "GMAT3.SA" },
    { name: "Smart Fit (SMFT3)", symbol: "SMFT3.SA" }, { name: "CVC (CVCB3)", symbol: "CVCB3.SA" }, { name: "Braskem (BRKM5)", symbol: "BRKM5.SA" },
    { name: "Ultrapar (UGPA3)", symbol: "UGPA3.SA" }, { name: "Cosan (CSAN3)", symbol: "CSAN3.SA" }, { name: "Raízen (RAIZ4)", symbol: "RAIZ4.SA" },
    { name: "3Tentos (TTEN3)", symbol: "TTEN3.SA" }, { name: "SLC Agrícola (SLCE3)", symbol: "SLCE3.SA" }, { name: "Jalles Machado (JALL3)", symbol: "JALL3.SA" }
  ],
  crypto: [
    { name: "Bitcoin (BTC)", symbol: "bitcoin" }, { name: "Ethereum (ETH)", symbol: "ethereum" }, { name: "Tether (USDT)", symbol: "tether" },
    { name: "BNB (BNB)", symbol: "binancecoin" }, { name: "Solana (SOL)", symbol: "solana" }, { name: "XRP (XRP)", symbol: "ripple" },
    { name: "USD Coin (USDC)", symbol: "usd-coin" }, { name: "Cardano (ADA)", symbol: "cardano" }, { name: "Dogecoin (DOGE)", symbol: "dogecoin" },
    { name: "TRON (TRX)", symbol: "tron" }, { name: "Avalanche (AVAX)", symbol: "avalanche-2" }, { name: "Shiba Inu (SHIB)", symbol: "shiba-inu" },
    { name: "Polkadot (DOT)", symbol: "polkadot" }, { name: "Chainlink (LINK)", symbol: "chainlink" }, { name: "Polygon (MATIC)", symbol: "matic-network" },
    { name: "Litecoin (LTC)", symbol: "litecoin" }, { name: "Bitcoin Cash (BCH)", symbol: "bitcoin-cash" }, { name: "Uniswap (UNI)", symbol: "uniswap" },
    { name: "Dai (DAI)", symbol: "dai" }, { name: "Wrapped Bitcoin (WBTC)", symbol: "wrapped-bitcoin" }, { name: "Aave (AAVE)", symbol: "aave" },
    { name: "Maker (MKR)", symbol: "maker" }, { name: "Cosmos (ATOM)", symbol: "cosmos" }, { name: "Stellar (XLM)", symbol: "stellar" },
    { name: "Algorand (ALGO)", symbol: "algorand" }, { name: "VeChain (VET)", symbol: "vechain" }, { name: "Filecoin (FIL)", symbol: "filecoin" },
    { name: "Monero (XMR)", symbol: "monero" }, { name: "Ethereum Classic (ETC)", symbol: "ethereum-classic" }, { name: "Hedera (HBAR)", symbol: "hedera-hashgraph" },
    { name: "Arbitrum (ARB)", symbol: "arbitrum" }, { name: "Near Protocol (NEAR)", symbol: "near" }, { name: "Aptos (APT)", symbol: "aptos" },
    { name: "Internet Computer (ICP)", symbol: "internet-computer" }, { name: "Optimism (OP)", symbol: "optimism" }, { name: "The Graph (GRT)", symbol: "the-graph" },
    { name: "Fantom (FTM)", symbol: "fantom" }, { name: "Quant (QNT)", symbol: "quant-network" }, { name: "Injective (INJ)", symbol: "injective-protocol" },
    { name: "Lido DAO (LDO)", symbol: "lido-dao" }, { name: "Render Token (RNDR)", symbol: "render-token" }, { name: "Immutable X (IMX)", symbol: "immutable-x" },
    { name: "Stacks (STX)", symbol: "blockstack" }, { name: "Theta Network (THETA)", symbol: "theta-token" }, { name: "Sei (SEI)", symbol: "sei-network" },
    { name: "Sui (SUI)", symbol: "sui" }, { name: "Celestia (TIA)", symbol: "celestia" }, { name: "Toncoin (TON)", symbol: "the-open-network" },
    { name: "Flow (FLOW)", symbol: "flow" }, { name: "Axie Infinity (AXS)", symbol: "axie-infinity" }, { name: "The Sandbox (SAND)", symbol: "the-sandbox" },
    { name: "Decentraland (MANA)", symbol: "decentraland" }, { name: "Enjin Coin (ENJ)", symbol: "enjincoin" }, { name: "Gala (GALA)", symbol: "gala" },
    { name: "ApeCoin (APE)", symbol: "apecoin" }, { name: "Floki Inu (FLOKI)", symbol: "floki" }, { name: "Pepe (PEPE)", symbol: "pepe" },
    { name: "Worldcoin (WLD)", symbol: "worldcoin-wld" }
  ]
};

const typeLabels = { fixed_selic: 'Selic/CDI', fixed_ipca: 'IPCA+', stock: 'Ações', crypto: 'Crypto' };

// Funções auxiliares
function formatCurrency(value) { 
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
}

function parseCurrency(value) { 
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0; 
}

function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alertContainer');
  const colors = {
    info: 'bg-blue-900 border-blue-600 text-blue-100',
    error: 'bg-red-900 border-red-600 text-red-100',
    warning: 'bg-yellow-900 border-yellow-600 text-yellow-100'
  };
  const alertClass = colors[type] || colors.info;
  alertContainer.innerHTML = `<div class="rounded-lg p-4 border-l-4 ${alertClass}">${message}</div>`;
  setTimeout(() => { alertContainer.innerHTML = ''; }, 5000);
}

function handleValueChange(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value) {
    value = (parseInt(value) / 100).toFixed(2);
    e.target.value = formatCurrency(parseFloat(value));
  }
}

function countBusinessDays(startDate, endDate) {
  let count = 0;
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}

// LocalStorage
function saveInvestments() {
  localStorage.setItem('investments', JSON.stringify(investments));
}

function loadInvestments() {
  const saved = localStorage.getItem('investments');
  if (saved) investments = JSON.parse(saved);
}

// APIs externas
async function fetchMarketData() {
  try {
    // Simulando taxas (em produção, buscar de API real)
    marketData.selic = 10.75;
    marketData.ipca = 4.62;
    document.getElementById('selicRate').textContent = `Selic: ${marketData.selic.toFixed(2)}%`;
    document.getElementById('ipcaRate').textContent = `IPCA: ${marketData.ipca.toFixed(2)}%`;
  } catch (error) {
    console.error('Erro ao buscar taxas:', error);
  }
}

async function getStockPrice(symbol) {
  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`);
    const data = await response.json();
    if (data.chart?.result?.[0]?.meta?.regularMarketPrice) {
      return data.chart.result[0].meta.regularMarketPrice;
    }
    throw new Error('Cotação não disponível');
  } catch (error) {
    console.error('Erro ao buscar cotação de ação:', error);
    return null;
  }
}

async function getCryptoPrice(symbol) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=brl`);
    const data = await response.json();
    if (data[symbol]?.brl) {
      return data[symbol].brl;
    }
    throw new Error('Cotação não disponível');
  } catch (error) {
    console.error('Erro ao buscar cotação de crypto:', error);
    return null;
  }
}

async function getHistoricalStockPrice(symbol, date) {
  try {
    const timestamp = Math.floor(date.getTime() / 1000);
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${timestamp}&period2=${timestamp + 86400}&interval=1d`);
    const data = await response.json();
    if (data.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.[0]) {
      return data.chart.result[0].indicators.quote[0].close[0];
    }
    return await getStockPrice(symbol);
  } catch (error) {
    return await getStockPrice(symbol);
  }
}

async function getHistoricalCryptoPrice(symbol, date) {
  try {
    const dateStr = date.toISOString().split('T')[0].split('-').reverse().join('-');
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}/history?date=${dateStr}`);
    const data = await response.json();
    if (data.market_data?.current_price?.brl) {
      return data.market_data.current_price.brl;
    }
    return await getCryptoPrice(symbol);
  } catch (error) {
    return await getCryptoPrice(symbol);
  }
}

// Cálculos
async function calculateCurrentValue(investment) {
  const { type, initialValue, date, rate, quantity, symbol, avgPrice } = investment;
  
  if (type === 'stock') {
    const currentPrice = await getStockPrice(symbol);
    return currentPrice ? quantity * currentPrice : initialValue;
  }
  
  if (type === 'crypto') {
    const currentPrice = await getCryptoPrice(symbol);
    return currentPrice ? quantity * currentPrice : initialValue;
  }
  
  const startDate = new Date(date);
  const today = new Date();
  const businessDays = countBusinessDays(startDate, today);
  const years = businessDays / 252;
  
  if (type === 'fixed_selic') {
    const effectiveRate = (marketData.selic / 100) * (rate / 100);
    return initialValue * Math.pow(1 + effectiveRate, years);
  }
  
  if (type === 'fixed_ipca') {
    const totalRate = (marketData.ipca + rate) / 100;
    return initialValue * Math.pow(1 + totalRate, years);
  }
  
  return initialValue;
}

// Event handlers
document.getElementById('invType').addEventListener('change', function(e) {
  const optionSelect = document.getElementById('invOption');
  const type = e.target.value;
  
  if (!type) {
    optionSelect.classList.add('hidden');
    return;
  }
  
  optionSelect.innerHTML = '<option value="">Selecione o investimento</option>';
  investmentOptions[type].forEach((opt, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = opt.name;
    optionSelect.appendChild(option);
  });
  
  optionSelect.classList.remove('hidden');
});

document.getElementById('invValue').addEventListener('input', handleValueChange);

document.getElementById('submitBtn').addEventListener('click', addInvestment);

async function addInvestment() {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processando...';
  
  try {
    const type = document.getElementById('invType').value;
    const optionIdx = document.getElementById('invOption').value;
    const valueStr = document.getElementById('invValue').value;
    const date = document.getElementById('invDate').value;
    
    if (!type || !optionIdx || !valueStr || !date) {
      throw new Error('Preencha todos os campos');
    }
    
    const value = parseCurrency(valueStr);
    if (value <= 0) throw new Error('Valor inválido');
    
    const selected = investmentOptions[type][optionIdx];
    const investment = {
      id: Date.now(),
      type,
      name: selected.name,
      initialValue: value,
      date,
      rate: selected.rate
    };
    
    if (type === 'stock' || type === 'crypto') {
      investment.symbol = selected.symbol;
      showAlert('Buscando cotação atual...', 'info');
      const currentPrice = type === 'stock' ? await getStockPrice(selected.symbol) : await getCryptoPrice(selected.symbol);
      if (!currentPrice) throw new Error('Não foi possível obter a cotação');
      investment.quantity = value / currentPrice;
      investment.avgPrice = currentPrice;
    }
    
    investments.push(investment);
    saveInvestments();
    
    document.getElementById('invType').value = '';
    document.getElementById('invOption').value = '';
    document.getElementById('invOption').classList.add('hidden');
    document.getElementById('invValue').value = '';
    document.getElementById('invDate').value = new Date().toISOString().split('T')[0];
    
    showAlert('✅ Investimento adicionado com sucesso!', 'info');
    await renderInvestments();
    await updateSummary();
    await renderTopPerformers();
  } catch (error) {
    showAlert(`Erro: ${error.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Adicionar Investimento';
  }
}

function deleteInvestment(id) {
  if (!confirm('Deseja realmente excluir este investimento?')) return;
  investments = investments.filter(inv => inv.id !== id);
  saveInvestments();
  renderInvestments();
  updateSummary();
  renderTopPerformers();
  showAlert('Investimento excluído', 'info');
}

async function renderInvestments() {
  const container = document.getElementById('investmentList');
  
  if (investments.length === 0) {
    container.innerHTML = '<div class="text-center py-12 text-gray-500">Nenhum investimento cadastrado ainda</div>';
    document.getElementById('topPerformersContainer').classList.add('hidden');
    return;
  }
  
  container.innerHTML = '<div class="text-center py-8 text-gray-400">Carregando cotações...</div>';
  document.getElementById('topPerformersContainer').classList.remove('hidden');
  
  const html = await Promise.all(investments.map(async inv => {
    const currentValue = await calculateCurrentValue(inv);
    investmentValues[inv.id] = currentValue;
    const profit = currentValue - inv.initialValue;
    const profitPercent = ((profit / inv.initialValue) * 100);
    const businessDays = countBusinessDays(new Date(inv.date), new Date());
    
    return `
      <div class="bg-gray-800 rounded-xl p-6 mb-4 border border-gray-700 hover:border-purple-500 transition-all">
        <div class="flex justify-between items-start mb-4">
          <div>
            <div class="text-xl font-bold text-white mb-2">${inv.name}</div>
            <span class="inline-block px-3 py-1 bg-purple-600 text-white text-xs rounded-full">${typeLabels[inv.type]}</span>
          </div>
          <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all" onclick="deleteInvestment(${inv.id})">
            Excluir
          </button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          ${inv.quantity ? `
            <div>
              <div class="text-gray-400 text-xs mb-1">Quantidade</div>
              <div class="text-white font-semibold">${inv.quantity.toFixed(8)}</div>
            </div>
            <div>
              <div class="text-gray-400 text-xs mb-1">Preço Médio</div>
              <div class="text-white font-semibold">R$ ${formatCurrency(inv.avgPrice)}</div>
            </div>
          ` : ''}
          <div>
            <div class="text-gray-400 text-xs mb-1">Investido</div>
            <div class="text-white font-semibold">R$ ${formatCurrency(inv.initialValue)}</div>
          </div>
          <div>
            <div class="text-gray-400 text-xs mb-1">Valor Atual</div>
            <div class="text-white font-semibold">R$ ${formatCurrency(currentValue)}</div>
          </div>
          <div>
            <div class="text-gray-400 text-xs mb-1">Rentabilidade</div>
            <div class="font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}">
              ${profit >= 0 ? '+' : ''}R$ ${formatCurrency(Math.abs(profit))}
            </div>
            <div class="text-sm ${profit >= 0 ? 'text-green-400' : 'text-red-400'}">
              (${profitPercent.toFixed(2)}%)
            </div>
            ${(inv.type === 'fixed_selic' || inv.type === 'fixed_ipca') ? 
              `<div class="text-gray-500 text-xs mt-1">${businessDays} dias úteis</div>` : ''}
          </div>
          <div>
            <div class="text-gray-400 text-xs mb-1">Data</div>
            <div class="text-white font-semibold">${new Date(inv.date).toLocaleDateString('pt-BR')}</div>
          </div>
        </div>
      </div>
    `;
  }));
  
  container.innerHTML = html.join('');
}

async function updateSummary() {
  const container = document.getElementById('summaryCards');
  
  if (investments.length === 0) { 
    container.classList.add('hidden'); 
    return; 
  }
  
  container.classList.remove('hidden');
  
  const totalInvested = investments.reduce((acc, inv) => acc + inv.initialValue, 0);
  const totalCurrent = Object.values(investmentValues).reduce((acc, val) => acc + val, 0);
  const totalProfit = totalCurrent - totalInvested;
  const totalProfitPercent = totalInvested > 0 ? ((totalProfit / totalInvested) * 100) : 0;
  
  container.innerHTML = `
    <div class="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-center">
      <div class="text-purple-200 text-sm mb-2">Total Investido</div>
      <div class="text-white text-3xl font-bold">R$ ${formatCurrency(totalInvested)}</div>
    </div>
    <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center">
      <div class="text-blue-200 text-sm mb-2">Patrimônio Atual</div>
      <div class="text-white text-3xl font-bold">R$ ${formatCurrency(totalCurrent)}</div>
    </div>
    <div class="bg-gradient-to-br from-${totalProfit >= 0 ? 'green' : 'red'}-600 to-${totalProfit >= 0 ? 'green' : 'red'}-700 rounded-xl p-6 text-center">
      <div class="text-${totalProfit >= 0 ? 'green' : 'red'}-200 text-sm mb-2">Rentabilidade</div>
      <div class="text-white text-3xl font-bold">${totalProfit >= 0 ? '+' : ''}R$ ${formatCurrency(Math.abs(totalProfit))}</div>
      <div class="text-${totalProfit >= 0 ? 'green' : 'red'}-200 text-sm mt-2">(${totalProfitPercent.toFixed(2)}%)</div>
    </div>
  `;
}

function getFilteredInvestments() {
  if (periodFilter === 'all') return investments;
  
  const now = new Date();
  const periods = {
    week: 7,
    month: 30,
    quarter: 90,
    year: 365
  };
  
  const daysBack = periods[periodFilter] || 30;
  const cutoffDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
  
  return investments.filter(inv => new Date(inv.date) >= cutoffDate);
}

async function renderTopPerformers() {
  const container = document.getElementById('topPerformersList');
  const filtered = getFilteredInvestments();
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="text-center py-8 text-gray-500">Nenhum investimento no período selecionado</div>';
    return;
  }
  
  container.innerHTML = '<div class="text-center py-8 text-gray-400">Calculando performances...</div>';
  
  const performances = await Promise.all(filtered.map(async inv => {
    const currentValue = investmentValues[inv.id] || await calculateCurrentValue(inv);
    const profit = currentValue - inv.initialValue;
    const profitPercent = ((profit / inv.initialValue) * 100);
    return { ...inv, currentValue, profit, profitPercent };
  }));
  
  const sorted = performances.sort((a, b) => b.profitPercent - a.profitPercent).slice(0, 10);
  
  if (sorted.length === 0) {
    container.innerHTML = '<div class="text-center py-8 text-gray-500">Nenhum dado disponível</div>';
    return;
  }
  
  const html = sorted.map((inv, idx) => `
    <div class="flex items-center gap-4 p-4 bg-gray-800 rounded-lg mb-3 hover:bg-gray-750 transition-all">
      <div class="text-2xl font-bold text-purple-400 w-8">#${idx + 1}</div>
      <div class="flex-1">
        <div class="font-semibold text-white">${inv.name}</div>
        <div class="text-sm text-gray-400">${typeLabels[inv.type]}</div>
      </div>
      <div class="text-right">
        <div class="font-bold ${inv.profit >= 0 ? 'text-green-400' : 'text-red-400'}">
          ${inv.profit >= 0 ? '+' : ''}${inv.profitPercent.toFixed(2)}%
        </div>
        <div class="text-sm text-gray-400">
          R$ ${formatCurrency(Math.abs(inv.profit))}
        </div>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

document.getElementById('periodFilter').addEventListener('change', function(e) {
  periodFilter = e.target.value;
  renderTopPerformers();
});

// Dados de mercado em tempo real
async function fetchMarketGainers() {
  const container = document.getElementById('marketGainersList');
  try {
    // Top gainers brasileiros (simulado - em produção usar API real)
    const gainers = [
      { name: "Magazine Luiza", symbol: "MGLU3", change: 8.5, price: 15.32 },
      { name: "Via Varejo", symbol: "VIIA3", change: 7.2, price: 3.45 },
      { name: "Azul", symbol: "AZUL4", change: 6.8, price: 12.87 },
      { name: "Gol", symbol: "GOLL4", change: 6.3, price: 8.92 },
      { name: "CVC", symbol: "CVCB3", change: 5.9, price: 2.34 },
      { name: "Americanas", symbol: "AMER3", change: 5.4, price: 1.23 },
      { name: "Lojas Renner", symbol: "LREN3", change: 4.8, price: 18.45 },
      { name: "B2W", symbol: "BTOW3", change: 4.2, price: 7.65 },
      { name: "Marisa", symbol: "AMAR3", change: 3.9, price: 0.89 },
      { name: "Guararapes", symbol: "GUAR3", change: 3.5, price: 5.67 }
    ];
    
    const html = gainers.map((stock, idx) => `
      <div class="flex items-center gap-4 p-4 bg-gray-800 rounded-lg mb-3 hover:bg-gray-750 transition-all">
        <div class="text-2xl font-bold text-green-400 w-8">#${idx + 1}</div>
        <div class="flex-1">
          <div class="font-semibold text-white">${stock.name}</div>
          <div class="text-sm text-gray-400">${stock.symbol}</div>
        </div>
        <div class="text-right">
          <div class="text-white font-semibold">R$ ${stock.price.toFixed(2)}</div>
          <div class="text-green-400 font-bold">+${stock.change.toFixed(2)}%</div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = '<div class="text-center py-8 text-red-400">Erro ao carregar dados do mercado</div>';
  }
}

async function fetchMarketLosers() {
  const container = document.getElementById('marketLosersList');
  try {
    // Top losers brasileiros (simulado - em produção usar API real)
    const losers = [
      { name: "Oi", symbol: "OIBR3", change: -8.3, price: 0.42 },
      { name: "IRB Brasil", symbol: "IRBR3", change: -7.1, price: 8.54 },
      { name: "Hapvida", symbol: "HAPV3", change: -6.5, price: 4.32 },
      { name: "Cogna", symbol: "COGN3", change: -5.8, price: 2.87 },
      { name: "Yduqs", symbol: "YDUQ3", change: -5.2, price: 12.34 },
      { name: "Natura", symbol: "NTCO3", change: -4.9, price: 14.56 },
      { name: "Qualicorp", symbol: "QUAL3", change: -4.5, price: 3.21 },
      { name: "Fleury", symbol: "FLRY3", change: -4.1, price: 15.78 },
      { name: "Ânima", symbol: "ANIM3", change: -3.8, price: 4.89 },
      { name: "Ser Educacional", symbol: "SEER3", change: -3.4, price: 6.12 }
    ];
    
    const html = losers.map((stock, idx) => `
      <div class="flex items-center gap-4 p-4 bg-gray-800 rounded-lg mb-3 hover:bg-gray-750 transition-all">
        <div class="text-2xl font-bold text-red-400 w-8">#${idx + 1}</div>
        <div class="flex-1">
          <div class="font-semibold text-white">${stock.name}</div>
          <div class="text-sm text-gray-400">${stock.symbol}</div>
        </div>
        <div class="text-right">
          <div class="text-white font-semibold">R$ ${stock.price.toFixed(2)}</div>
          <div class="text-red-400 font-bold">${stock.change.toFixed(2)}%</div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = '<div class="text-center py-8 text-red-400">Erro ao carregar dados do mercado</div>';
  }
}

// Inicialização
async function init() {
  loadInvestments();
  await fetchMarketData();
  await fetchMarketGainers();
  await fetchMarketLosers();
  
  document.getElementById('invDate').value = new Date().toISOString().split('T')[0];
  
  if (investments.length > 0) {
    await renderInvestments();
    await updateSummary();
    await renderTopPerformers();
  }
}

// Iniciar aplicação
init();
