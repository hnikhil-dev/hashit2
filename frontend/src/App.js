import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const initialForm = {
  username: '',
  email: '',
  password: '',
};

// Floating symbols component for creative background
const FloatingSymbols = () => {
  const symbols = ['₹', '$', '€', '¥', '£', '₿'];
  
  return (
    <div className="floating-symbols">
      {symbols.map((symbol, index) => (
        <span
          key={index}
          className="float-symbol"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
};

// New Dashboard and About pages from upstream
function DashboardPage({ username, onNavigate, onSignOut, loading }) {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Vectra</h2>
        </div>
        <div className="navbar-menu">
          <button className="nav-button active" onClick={() => onNavigate('dashboard')}>
            Dashboard
          </button>
          <button className="nav-button" onClick={() => onNavigate('about')}>
            About
          </button>
          <button className="nav-button signout" onClick={onSignOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        {/* Enhanced Hero Section */}
        <section className="dashboard-hero">
          <div className="dashboard-content">
            <div className="user-greeting">
              <h1>Welcome back, <span className="username-highlight">{username}</span></h1>
              <p className="dashboard-subtitle">
                Ready to master financial decisions? Choose your path to building wealth and managing risk.
              </p>
            </div>
            <div className="progress-indicator">
              <div className="progress-item">
                <div className="progress-icon level-icon"></div>
                <div className="progress-text">
                  <span className="progress-label">Player Level</span>
                  <span className="progress-value">Beginner</span>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-icon goal-icon"></div>
                <div className="progress-text">
                  <span className="progress-label">Next Goal</span>
                  <span className="progress-value">First Game</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Action Cards */}
        <section className="actions-section">
          <h2 className="actions-title">Your Financial Journey</h2>
          <div className="actions-grid">
            <div className="action-card primary-card">
              <div className="card-decoration"></div>
              <div className="card-icon-wrapper">
                <div className="card-icon game-icon"></div>
              </div>
              <div className="card-content">
                <h3>Financial Simulation</h3>
                <p>Enter multiplayer rooms, make strategic investments, and compete with real players to maximize your wealth over multiple years.</p>
                <div className="card-features">
                  <span className="feature-tag">Multiplayer</span>
                  <span className="feature-tag">Real-time</span>
                  <span className="feature-tag">Strategic</span>
                </div>
              </div>
              <button className="card-action-button primary" onClick={() => onNavigate('home')}>
                Enter Game Room
                <span className="button-arrow">→</span>
              </button>
            </div>

            <div className="action-card">
              <div className="card-decoration"></div>
              <div className="card-icon-wrapper">
                <div className="card-icon quiz-icon"></div>
              </div>
              <div className="card-content">
                <h3>Knowledge Test</h3>
                <p>Assess your financial literacy with interactive quizzes covering investment strategies, risk management, and market dynamics.</p>
                <div className="card-features">
                  <span className="feature-tag">Educational</span>
                  <span className="feature-tag">Interactive</span>
                </div>
              </div>
              <button className="card-action-button" onClick={() => onNavigate('quiz')}>
                Take Quiz
                <span className="button-arrow">→</span>
              </button>
            </div>

            <div className="action-card">
              <div className="card-decoration"></div>
              <div className="card-icon-wrapper">
                <div className="card-icon learn-icon"></div>
              </div>
              <div className="card-content">
                <h3>Game Guide</h3>
                <p>Discover investment options, understand game mechanics, and learn about the team behind Vectra's financial education platform.</p>
                <div className="card-features">
                  <span className="feature-tag">Comprehensive</span>
                  <span className="feature-tag">Detailed</span>
                </div>
              </div>
              <button className="card-action-button" onClick={() => onNavigate('about')}>
                Learn More
                <span className="button-arrow">→</span>
              </button>
            </div>

            <div className="action-card">
              <div className="card-decoration"></div>
              <div className="card-icon-wrapper">
                <div className="card-icon chart-icon"></div>
              </div>
              <div className="card-content">
                <h3>Financial Markets</h3>
                <p>Learn how the Indian stock market works — Nifty, Sensex, bull/bear cycles — and view live charts for NSE & BSE indices.</p>
                <div className="card-features">
                  <span className="feature-tag">NSE / BSE</span>
                  <span className="feature-tag">Live Charts</span>
                  <span className="feature-tag">Learn</span>
                </div>
              </div>
              <button className="card-action-button" onClick={() => onNavigate('markets')}>
                Explore Markets
                <span className="button-arrow">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="quick-stats">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon trophy-icon"></div>
              <div className="stat-info">
                <span className="stat-number">0</span>
                <span className="stat-label">Games Played</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon chart-icon"></div>
              <div className="stat-info">
                <span className="stat-number">$0</span>
                <span className="stat-label">Best Score</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon star-icon"></div>
              <div className="stat-info">
                <span className="stat-number">0</span>
                <span className="stat-label">Achievements</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const CHART_WIDGETS = [
  { label: 'Nifty 50', symbol: 'NSE:NIFTY', color: '#00ff9d' },
  { label: 'Sensex', symbol: 'BSE:SENSEX', color: '#00d0ff' },
  { label: 'Bank Nifty', symbol: 'NSE:BANKNIFTY', color: '#a78bfa' },
  { label: 'Nifty IT', symbol: 'NSE:NIFTYIT', color: '#fbbf24' },
  { label: 'Nifty Pharma', symbol: 'NSE:CNXPHARMA', color: '#f472b6' },
  { label: 'Nifty Midcap', symbol: 'NSE:NIFTY_MIDCAP_100', color: '#fb923c' },
];

const MARKET_TOPICS = [
  {
    title: 'The Stock Market — An Introduction',
    tag: 'Module 1',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2014/07/M1-Ch1-title.jpg',
    body: 'A stock market is where buyers and sellers trade shares of publicly listed companies. In India, the two primary exchanges are NSE (National Stock Exchange) and BSE (Bombay Stock Exchange). When you buy a share, you own a small piece of that company and participate in its profits and growth.',
    points: [
      'NSE & BSE are India\'s two main stock exchanges',
      'SEBI regulates all market activity to protect investors',
      'Shares represent fractional ownership of a company',
      'Market hours: 9:15 AM – 3:30 PM IST, Mon–Fri',
    ],
    source: 'https://zerodha.com/varsity/module/introduction-to-stock-markets/',
  },
  {
    title: 'Bull & Bear Markets',
    tag: 'Module 1 · Ch 4',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2014/09/M1-Ch4-Chart.jpg',
    body: 'A bull market is a sustained period of rising prices (20%+ gains) driven by strong economic growth and investor confidence. A bear market is the opposite — prices fall 20%+ from recent highs, often triggered by recessions or crises. Recognising the cycle helps you decide when to buy, hold, or exit.',
    points: [
      'Bull market: optimism, rising GDP, high employment',
      'Bear market: pessimism, falling corporate earnings',
      'Corrections (10% drop) are normal and healthy',
      'Long-term investors use bear markets to accumulate quality stocks',
    ],
    source: 'https://zerodha.com/varsity/chapter/commonly-used-jargons/',
  },
  {
    title: 'Sensex & Nifty 50 — Market Indices',
    tag: 'Module 1 · Ch 5',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2014/09/M1-Ch5-Chart.jpg',
    body: 'Sensex tracks the 30 largest companies on BSE. Nifty 50 tracks the 50 largest on NSE. Both are free-float market-cap weighted indices — bigger companies have more influence. They act as the pulse of the Indian economy and benchmark for all fund performance.',
    points: [
      'Nifty 50 base value: 1000 (Nov 3, 1995)',
      'Sensex base value: 100 (1978–79)',
      'Sector indices: Nifty Bank, Nifty IT, Nifty Pharma, etc.',
      'Index funds & ETFs passively track these benchmarks',
    ],
    source: 'https://zerodha.com/varsity/chapter/the-stock-markets-index/',
  },
  {
    title: 'Candlestick Charts — Reading Price Action',
    tag: 'Module 2',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2014/10/M2-Ch3-Chart1.jpg',
    body: 'A candlestick shows four prices for a period: Open, High, Low, Close. A green (bullish) candle means close > open; red (bearish) means close < open. The wicks show the high and low extremes. Patterns like Doji, Hammer, and Engulfing signal potential reversals.',
    points: [
      'Green candle = buyers in control (close > open)',
      'Red candle = sellers in control (close < open)',
      'Long upper wick = rejection of higher prices',
      'Hammer pattern signals potential bullish reversal',
    ],
    source: 'https://zerodha.com/varsity/module/technical-analysis/',
  },
  {
    title: 'Support, Resistance & Moving Averages',
    tag: 'Module 2 · Ch 7',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2014/10/M2-Ch7-Chart1.jpg',
    body: 'Support is a price level where buying interest prevents further decline. Resistance is where selling pressure caps upward movement. Moving averages (50-day, 200-day) smooth out price noise and identify trend direction. A Golden Cross (50 MA crossing above 200 MA) is a classic bullish signal.',
    points: [
      'Support = floor; Resistance = ceiling for price',
      '50-day MA tracks medium-term trend',
      '200-day MA tracks long-term trend',
      'Golden Cross (50 > 200 MA) = bullish; Death Cross = bearish',
    ],
    source: 'https://zerodha.com/varsity/chapter/support-resistance/',
  },
  {
    title: 'Fundamental Analysis — Reading Financials',
    tag: 'Module 3',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2014/11/M3-Ch1-title.jpg',
    body: 'Fundamental analysis evaluates a company\'s intrinsic value by studying its financials — revenue, profit, debt, and growth. Key ratios like P/E, ROE, and Debt-to-Equity help compare companies. A stock trading below intrinsic value is considered undervalued and a potential buy.',
    points: [
      'P/E Ratio: how much you pay per ₹1 of earnings',
      'ROE > 15% indicates efficient use of shareholder capital',
      'Debt/Equity < 1 is generally considered safe',
      'EPS growth over 3–5 years signals a strong business',
    ],
    source: 'https://zerodha.com/varsity/module/fundamental-analysis/',
  },
  {
    title: 'Risk, Diversification & Asset Allocation',
    tag: 'Module 9',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2017/09/M9-C1-title.jpg',
    body: 'Risk is the possibility of losing money. Diversification — spreading investments across asset classes (equity, debt, gold, real estate) and sectors — reduces unsystematic risk. Asset allocation is the single biggest driver of long-term portfolio returns.',
    points: [
      'Unsystematic risk (company-specific) can be diversified away',
      'Systematic risk (market-wide) cannot be eliminated',
      'Rule of thumb: 100 minus your age = % in equities',
      'Rebalance portfolio annually to maintain target allocation',
    ],
    source: 'https://zerodha.com/varsity/module/personal-finance-mutual-funds/',
  },
  {
    title: 'Mutual Funds & SIP — Investing Made Simple',
    tag: 'Module 9 · Ch 3',
    img: 'https://zerodha.com/varsity/wp-content/uploads/2017/09/M9-C3-title.jpg',
    body: 'A mutual fund pools money from many investors into a diversified portfolio managed by a professional. A SIP (Systematic Investment Plan) lets you invest a fixed amount monthly, averaging your cost over time. Index funds are low-cost funds that simply track Nifty or Sensex.',
    points: [
      'Equity mutual funds: higher risk, higher long-term returns',
      'Debt funds: lower risk, stable returns (better than FD post-tax)',
      'SIP removes the need to time the market',
      'Expense ratio < 0.5% is ideal for index funds',
    ],
    source: 'https://zerodha.com/varsity/chapter/mutual-fund-basics/',
  },
];

const CHART_LINKS = [
  { label: 'Nifty 50 Live Chart', url: 'https://www.tradingview.com/chart/?symbol=NSE%3ANIFTY' },
  { label: 'Sensex Live Chart', url: 'https://www.tradingview.com/chart/?symbol=BSE%3ASENSEX' },
  { label: 'Nifty Bank Live Chart', url: 'https://www.tradingview.com/chart/?symbol=NSE%3ABANKNIFTY' },
  { label: 'Nifty IT Live Chart', url: 'https://www.tradingview.com/chart/?symbol=NSE%3ANIFTYIT' },
  { label: 'NSE Market Overview', url: 'https://www.nseindia.com/market-data/live-equity-market' },
  { label: 'BSE Market Overview', url: 'https://www.bseindia.com/markets/equity/EQReports/MarketWatch.aspx' },
];

function MarketsPage({ onBack, onSignOut, loading }) {
  const [activeTab, setActiveTab] = React.useState('learn');
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand"><h2>Vectra</h2></div>
        <div className="navbar-menu">
          <button className="nav-button" onClick={onBack}>Dashboard</button>
          <button className="nav-button active">Markets</button>
          <button className="nav-button signout" onClick={onSignOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </nav>
      <main className="about-main">
        <section className="about-hero">
          <div className="about-content">
            <div className="about-badge">Indian Stock Market</div>
            <h1 className="about-title">Financial Markets<span className="title-accent"> Knowledge Hub</span></h1>
            <p className="about-subtitle">Learn how stock markets work and track live Indian market charts.</p>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button
            className={`card-action-button${activeTab === 'learn' ? ' primary' : ''}`}
            onClick={() => setActiveTab('learn')}
          >📚 Learn</button>
          <button
            className={`card-action-button${activeTab === 'charts' ? ' primary' : ''}`}
            onClick={() => setActiveTab('charts')}
          >📈 Live Charts</button>
        </div>

        {activeTab === 'learn' && (
          <section className="features-section">
            <div style={{ display: 'grid', gap: '2rem', maxWidth: 900, margin: '0 auto' }}>
              {MARKET_TOPICS.map((topic, i) => (
                <div key={i} style={{
                  background: 'rgba(15,20,32,0.85)',
                  border: '1px solid rgba(0,255,157,0.15)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                }}>
                  <img
                    src={topic.img}
                    alt={topic.title}
                    onError={e => { e.target.style.display = 'none'; }}
                    style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20,
                        background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.3)',
                        color: '#00ff9d', fontSize: '0.75rem', fontWeight: 600,
                      }}>{topic.tag}</span>
                      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>Zerodha Varsity</span>
                    </div>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 10px' }}>{topic.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 16px', fontSize: '0.95rem' }}>{topic.body}</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {topic.points.map((pt, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
                          <span style={{ color: '#00ff9d', marginTop: 2, flexShrink: 0 }}>&#10003;</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <a href={topic.source} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18,
                      color: '#00d0ff', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
                    }}>Read on Varsity →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'charts' && (
          <section className="features-section">
            <h2 className="section-title">Live Indian Market Charts</h2>
            <p style={{ color: 'var(--text-muted, #aaa)', textAlign: 'center', marginBottom: '1.5rem' }}>
              Click any chart to open it live in a new tab via TradingView / NSE / BSE.
            </p>
            <div className="actions-grid">
              {CHART_LINKS.map((link, i) => (
                <div className="action-card" key={i}>
                  <div className="card-content">
                    <h3>{link.label}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #aaa)' }}>{link.url.replace('https://', '')}</p>
                  </div>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="card-action-button primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    View Chart <span className="button-arrow">→</span>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function AboutPage({ username, onBack, onSignOut, loading }) {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Vectra</h2>
        </div>
        <div className="navbar-menu">
          <button className="nav-button" onClick={onBack}>Dashboard</button>
          <button className="nav-button active">About</button>
          <button className="nav-button signout" onClick={onSignOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </nav>

      <main className="about-main">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-content">
            <div className="about-badge">Financial Education Platform</div>
            <h1 className="about-title">
              Vectra
              <span className="title-accent">Financial Simulation</span>
            </h1>
            <p className="about-subtitle">
              Master real-world financial decisions through competitive multiplayer gameplay.
              Build wealth, manage risk, and compete with strategic investment choices.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="features-section">
          <h2 className="section-title">Core Experience</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <div className="feature-content">
                <h3>Strategic Investment</h3>
                <p>Allocate your portfolio across multiple asset classes with realistic risk-return profiles. Make decisions that impact your long-term wealth accumulation.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-number">02</div>
              <div className="feature-content">
                <h3>Risk Management</h3>
                <p>Navigate market volatility and unexpected life events. Use insurance products and diversification strategies to protect your financial progress.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-number">03</div>
              <div className="feature-content">
                <h3>Multiplayer Competition</h3>
                <p>Compete with real players in timed decision rounds. Compare strategies and learn from different approaches to wealth building.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Mechanics */}
        <section className="mechanics-section">
          <div className="mechanics-grid">
            <div className="mechanics-content">
              <h2 className="section-title">Game Mechanics</h2>
              <div className="mechanics-list">
                <div className="mechanic-item">
                  <strong>Year-Based Rounds</strong>
                  <span>Each turn represents one financial year with income, expenses, and investment decisions.</span>
                </div>
                <div className="mechanic-item">
                  <strong>Progressive Unlocks</strong>
                  <span>New investment options become available as you advance through years, mimicking real-life financial maturity.</span>
                </div>
                <div className="mechanic-item">
                  <strong>Dynamic Events</strong>
                  <span>Random market conditions and life events test your financial resilience and planning skills.</span>
                </div>
                <div className="mechanic-item">
                  <strong>Performance Tracking</strong>
                  <span>Detailed analytics show your wealth growth, risk exposure, and decision impact over time.</span>
                </div>
              </div>
            </div>
            
            <div className="investment-showcase">
              <h3>Investment Portfolio</h3>
              <div className="investment-options">
                <div className="investment-tier tier-safe">
                  <div className="tier-label">Conservative</div>
                  <div className="investment-option">
                    <span className="option-name">Savings Account</span>
                    <span className="option-return">4.0% Fixed</span>
                  </div>
                  <div className="investment-option">
                    <span className="option-name">Government Bonds</span>
                    <span className="option-return">3.5-5.0%</span>
                  </div>
                </div>
                
                <div className="investment-tier tier-moderate">
                  <div className="tier-label">Moderate</div>
                  <div className="investment-option">
                    <span className="option-name">Mutual Funds</span>
                    <span className="option-return">8-12%</span>
                  </div>
                  <div className="investment-option">
                    <span className="option-name">Index Funds</span>
                    <span className="option-return">7-11%</span>
                  </div>
                </div>
                
                <div className="investment-tier tier-aggressive">
                  <div className="tier-label">Aggressive</div>
                  <div className="investment-option">
                    <span className="option-name">Individual Stocks</span>
                    <span className="option-return">±20%</span>
                  </div>
                  <div className="investment-option">
                    <span className="option-name">Cryptocurrency</span>
                    <span className="option-return">±40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="team-card">
            <h2>Built by Team Vectra</h2>
            <p>
              Developed for hackathon competition, Vectra combines rigorous financial education 
              principles with engaging game mechanics. Our goal is to make financial literacy 
              accessible and practical through hands-on experience.
            </p>
            <div className="team-stats">
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">Asset Classes</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Event Types</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Learning Potential</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [route, setRoute] = useState('auth'); // Add routing state
  const [roomForm, setRoomForm] = useState({
    createName: '',
    joinName: '',
  });

  const isConfigured = useMemo(() => Boolean(supabase), []);

  const navigate = (path) => {
    setRoute(path);
    resetFeedback();
  };

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let isMounted = true;

    const loadSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (isMounted) {
        setSession(currentSession);
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetFeedback = () => {
    setError('');
    setMessage('');
  };

  const isValidGmail = (email) => /^[^\s@]+@gmail\.com$/i.test(email.trim());

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!supabase) {
      setError('Supabase is not configured. Add your env keys first.');
      return;
    }

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    const username = form.username.trim();

    if (!isValidGmail(email)) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'register' && username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        setMessage(
          'Registration successful. Check your Gmail inbox for a confirmation link if email confirmation is enabled.'
        );
        setForm(initialForm);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        setMessage('Login successful.');
      }
    } catch (authError) {
      setError(authError.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    resetFeedback();

    if (!supabase) {
      return;
    }

    setLoading(true);

    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setMessage('You have been signed out.');
    } catch (signOutError) {
      setError(signOutError.message || 'Unable to sign out right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    resetFeedback();

    if (!supabase) {
      setError('Supabase is not configured. Add your env keys first.');
      return;
    }

    setLoading(true);

    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (googleError) {
        throw googleError;
      }
    } catch (googleError) {
      setError(
        googleError.message ||
          'Google sign-in could not start. Check your Supabase Google provider settings.'
      );
      setLoading(false);
    }
  };

  const handleRoomChange = (event) => {
    const { name, value } = event.target;
    setRoomForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreateRoom = (event) => {
    event.preventDefault();
    resetFeedback();
    
    if (!roomForm.createName.trim()) {
      setError('Please enter a room name');
      return;
    }
    
    setMessage(`Game room "${roomForm.createName}" created! (Backend integration pending)`);
    setRoomForm({ ...roomForm, createName: '' });
  };

  const handleJoinRoom = (event) => {
    event.preventDefault();
    resetFeedback();
    
    if (!roomForm.joinName.trim()) {
      setError('Please enter a room code');
      return;
    }
    
    setMessage(`Joining room "${roomForm.joinName}"... (Backend integration pending)`);
    setRoomForm({ ...roomForm, joinName: '' });
  };

  const currentUser = session?.user;
  const username =
    currentUser?.user_metadata?.username ||
    currentUser?.user_metadata?.full_name ||
    currentUser?.email?.split('@')[0] ||
    'User';

  // Add routing logic based on authentication and route state
  useEffect(() => {
    if (currentUser) {
      if (route === 'auth') {
        navigate('dashboard');
      }
    } else {
      if (route !== 'auth') {
        navigate('auth');
      }
    }
  }, [currentUser]);

  // Handle different routes for authenticated users
  if (currentUser && route === 'dashboard') {
    return (
      <DashboardPage
        username={username}
        onNavigate={(path) => {
          if (path === 'quiz') {
            setMessage('Quiz feature coming soon!');
            return;
          }
          navigate(path);
        }}
        onSignOut={handleSignOut}
        loading={loading}
      />
    );
  }

  if (currentUser && route === 'markets') {
    return (
      <MarketsPage
        onBack={() => navigate('dashboard')}
        onSignOut={handleSignOut}
        loading={loading}
      />
    );
  }

  if (currentUser && route === 'about') {
    return (
      <AboutPage
        username={username}
        onBack={() => navigate('dashboard')}
        onSignOut={handleSignOut}
        loading={loading}
      />
    );
  }

  if (currentUser && route === 'home') {
    return (
      <HomePage
        currentUser={currentUser}
        error={error}
        message={message}
        loading={loading}
        onRoomChange={handleRoomChange}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <>
      {!isConfigured ? (
        <main className="app-shell">
          <FloatingSymbols />
          <section className="hero-panel">
            <p className="eyebrow">Vectra Financial Game</p>
            <h1>Configuration Required</h1>
            <p className="hero-copy">
              Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to
              your .env file, then restart the application.
            </p>
          </section>
        </main>
      ) : currentUser ? (
        <HomePage
          currentUser={currentUser}
          username={username}
          roomForm={roomForm}
          error={error}
          message={message}
          loading={loading}
          onRoomChange={handleRoomChange}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          onSignOut={handleSignOut}
        />
      ) : (
        <main className="app-shell">
          {/* Subtle grid overlay for tech feel */}
          <div className="grid-overlay"></div>
          
          {/* Animated data streams */}
          <div className="data-streams">
            <div className="stream stream-1"></div>
            <div className="stream stream-2"></div>
            <div className="stream stream-3"></div>
          </div>

          <FloatingSymbols />
          
          <section className="hero-panel">
            <div className="hero-header">
              <p className="eyebrow">Vectra Financial Game</p>
              <h1>
                Master Your
                <span className="highlight-text"> Financial Future</span>
              </h1>
            </div>
            
            <p className="hero-copy">
              Compete in multiplayer financial simulation. Make strategic investment decisions, 
              manage risk, and build wealth over multiple years. Test your financial skills 
              against real players in dynamic market scenarios.
            </p>
            
            <div className="feature-list">
              <div className="feature-badge">
                <span>Investment Strategy</span>
              </div>
              <div className="feature-badge">
                <span>Risk Management</span>
              </div>
              <div className="feature-badge">
                <span>Multiplayer Rooms</span>
              </div>
              <div className="feature-badge">
                <span>Real-Time Competition</span>
              </div>
            </div>
          </section>

          <section className="auth-panel">
            <div className="auth-card">
              <div className="tab-row">
                <button
                  type="button"
                  className={mode === 'login' ? 'tab active' : 'tab'}
                  onClick={() => {
                    setMode('login');
                    resetFeedback();
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={mode === 'register' ? 'tab active' : 'tab'}
                  onClick={() => {
                    setMode('register');
                    resetFeedback();
                  }}
                >
                  Register
                </button>
              </div>

              <h2>{mode === 'login' ? 'Player Login' : 'Join Vectra'}</h2>
              <p className="panel-copy">
                {mode === 'login'
                  ? 'Sign in to access your player profile and join game rooms.'
                  : 'Create a player account to compete in financial simulation matches.'}
              </p>

              <button
                type="button"
                className="google-button"
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                {loading ? 'Connecting...' : 'Quick Start with Google'}
              </button>

              <div className="divider">
                <span>or continue with email</span>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {mode === 'register' ? (
                  <label className="input-group">
                    <span>Player Name</span>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your player name"
                      value={form.username}
                      onChange={handleChange}
                      autoComplete="username"
                    />
                  </label>
                ) : null}

                <label className="input-group">
                  <span>Email Address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </label>

                <label className="input-group">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete={
                      mode === 'login' ? 'current-password' : 'new-password'
                    }
                  />
                </label>

                {error ? <p className="feedback error">{error}</p> : null}
                {message ? <p className="feedback success">{message}</p> : null}

                <button type="submit" className="primary-button" disabled={loading}>
                  {loading
                    ? mode === 'login'
                      ? 'Logging In...'
                      : 'Creating Player...'
                    : mode === 'login'
                      ? 'Enter Game'
                      : 'Start Playing'}
                </button>
              </form>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default App;
