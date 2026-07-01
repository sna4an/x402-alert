export default function Home() {
  const endpoints = [
    { slug: "india-stock", price: "$0.075", desc: "Indian stock market data from MoneyControl" },
    { slug: "fuel-price", price: "$0.05", desc: "Live petrol & diesel prices in India" },
    { slug: "gold-silver", price: "$0.06", desc: "Live gold & silver prices in India" },
    { slug: "sec-risk", price: "$0.10", desc: "SEC 8-K risk signal analysis" },
    { slug: "defi-yield", price: "$0.09", desc: "Real DeFi yield & APY analysis" },
    { slug: "indian-exchange", price: "$0.075", desc: "Indian Stock Exchange (NSE/BSE) data" },
    { slug: "hyperliquid", price: "$0.08", desc: "Hyperliquid OI, funding & market data" },
    { slug: "exchange-rates", price: "$0.05", desc: "Fast currency exchange rates" },
    { slug: "trading-signals", price: "$0.12", desc: "Trading signals & alerts" },
    { slug: "insider-trades", price: "$0.10", desc: "Insider trading alerts & data" },
    { slug: "bin-checker", price: "$0.05", desc: "BIN/IIN card info lookup" },
    { slug: "username-check", price: "$0.05", desc: "Username availability across platforms" },
    { slug: "dev-intelligence", price: "$0.15", desc: "Developer intelligence & code analysis" },
    { slug: "cellystial", price: "$0.08", desc: "Celestial satellite & celestial data" },
  ];

  return (
    <main>
      <div className="hero">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e53e3e">
            <path d="M12 2C10.9 2 10 2.9 10 4C10 4.1 10 4.19 10.02 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H21V19L19 17V11C19 7.82 16.88 5.14 13.98 4.29C14 4.19 14 4.1 14 4C14 2.9 13.1 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"/>
          </svg>
        </div>
        <h1>x402 Alert</h1>
        <p className="tagline">Financial Alerts &amp; Monitoring API Hub</p>
        <div className="badges">
          <span className="badge">14 Endpoints</span>
          <span className="badge">x402 Protocol</span>
          <span className="badge warn">USDC on Base</span>
          <span className="badge">$0.05 – $0.15</span>
        </div>
      </div>
      <div className="content">
        <h2 className="section-title">Available Endpoints</h2>
        <div className="grid">
          {endpoints.map((ep) => (
            <div key={ep.slug} className="card">
              <div className="card-price">{ep.price} USDC</div>
              <div className="card-path">/api/{ep.slug}</div>
              <div className="card-desc">{ep.desc}</div>
            </div>
          ))}
        </div>
        <div className="info">
          <h3>How to Access</h3>
          <p>Each endpoint requires an x402 micropayment in USDC on Base chain. Send a request without payment to receive a <code>402 Payment Required</code> response with payment instructions.</p>
          <p>Wallet: <code>0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c</code></p>
          <p>Discovery: <code>/.well-known/x402</code></p>
          <p>OpenAPI spec: <code>/openapi.json</code></p>
        </div>
      </div>
      <footer>x402 Alert &mdash; Powered by the x402 Payment Protocol</footer>
    </main>
  );
}
