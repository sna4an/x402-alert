1|import { NextResponse } from "next/server";
2|
3|interface ParamDef {
4|  name: string;
5|  type: string;
6|  description: string;
7|  required?: boolean;
8|}
9|
10|interface EndpointDef {
11|  description: string;
12|  rapidHost: string;
13|  price: string;
14|  params: ParamDef[];
15|}
16|
17|const endpoints: Record<string, EndpointDef> = {
18|  "bin-checker": {
19|    description: "BIN/IIN card information checker. Look up bank, card type, country and other details from a BIN/IIN number.",
20|    rapidHost: "bin-info-checker",
21|    price: "0.05",
22|    params: [
23|      { name: "bin", type: "string", description: "The 6-8 digit BIN/IIN number to look up", required: true },
24|    ],
25|  },
26|  cellystial: {
27|    description: "Celestial body and astronomical data. Query information about planets, stars, moons and other celestial objects.",
28|    rapidHost: "cellystial",
29|    price: "0.08",
30|    params: [
31|      { name: "query", type: "string", description: "Name of the celestial body (e.g. 'Mars', 'Andromeda')", required: true },
32|    ],
33|  },
34|  "defi-yield": {
35|    description: "DeFi yield and honest real APY data. Get real APY and yield farming data across DeFi protocols.",
36|    rapidHost: "defi-yield-honesty-real-apy",
37|    price: "0.09",
38|    params: [
39|      { name: "query", type: "string", description: "Protocol name or search query (e.g. 'Aave', 'Compound')", required: true },
40|    ],
41|  },
42|  "dev-intelligence": {
43|    description: "Developer intelligence and code metrics. Analyze developer profiles, repositories, and contribution activity.",
44|    rapidHost: "gocreative-developer-intelligence",
45|    price: "0.15",
46|    params: [
47|      { name: "query", type: "string", description: "GitHub username or repository to analyze", required: true },
48|    ],
49|  },
50|  "exchange-rates": {
51|    description: "Fast price exchange rates. Get real-time currency exchange rates for fiat and crypto pairs.",
52|    rapidHost: "fast-price-exchange-rates",
53|    price: "0.05",
54|    params: [
55|      { name: "base", type: "string", description: "Base currency code (e.g. 'USD', 'EUR', 'BTC')", required: true },
56|      { name: "target", type: "string", description: "Target currency code (e.g. 'EUR', 'GBP')", required: false },
57|    ],
58|  },
59|  "fuel-price": {
60|    description: "Live fuel/petrol/diesel prices in India. Get current fuel prices by city across India.",
61|    rapidHost: "fuel-petrol-diesel-live-price-india",
62|    price: "0.05",
63|    params: [
64|      { name: "city", type: "string", description: "Indian city name (e.g. 'Delhi', 'Mumbai')", required: true },
65|    ],
66|  },
67|  "gold-silver": {
68|    description: "Live gold and silver prices in India. Get current bullion prices in INR per gram/ounce.",
69|    rapidHost: "gold-silver-live-price-india",
70|    price: "0.06",
71|    params: [
72|      { name: "city", type: "string", description: "Indian city name for local prices (e.g. 'Chennai', 'Delhi')", required: false },
73|    ],
74|  },
75|  hyperliquid: {
76|    description: "Hyperliquid market data, open interest, and funding rates. Query perpetual futures data on Hyperliquid DEX.",
77|    rapidHost: "hyperliquid-market-data-oi-funding",
78|    price: "0.08",
79|    params: [
80|      { name: "coin", type: "string", description: "Trading pair symbol (e.g. 'BTC', 'ETH', 'SOL')", required: true },
81|    ],
82|  },
83|  "india-stock": {
84|    description: "India stock market data from Moneycontrol. Get stock quotes, fundamentals, and historical data for Indian equities.",
85|    rapidHost: "india-stock-market-moneycontrol",
86|    price: "0.075",
87|    params: [
88|      { name: "symbol", type: "string", description: "Stock symbol or search query (e.g. 'RELIANCE', 'TCS')", required: true },
89|    ],
90|  },
91|  "indian-exchange": {
92|    description: "Indian stock exchange API data. Get NSE/BSE market data, indices, and stock information.",
93|    rapidHost: "indian-stock-exchange-api2",
94|    price: "0.075",
95|    params: [
96|      { name: "symbol", type: "string", description: "NSE/BSE stock symbol (e.g. 'INFY', 'HDFCBANK')", required: true },
97|      { name: "exchange", type: "string", description: "Exchange name: 'NSE' or 'BSE'", required: false },
98|    ],
99|  },
100|  "insider-trades": {
101|    description: "Insider trade alerts and filings. Track insider buying and selling activity for US-listed companies.",
102|    rapidHost: "insider-trade-alerts",
103|    price: "0.10",
104|    params: [
105|      { name: "symbol", type: "string", description: "Stock ticker symbol (e.g. 'AAPL', 'MSFT', 'TSLA')", required: true },
106|    ],
107|  },
108|  "sec-risk": {
109|    description: "SEC 8-K risk signal analysis. Analyze SEC 8-K filings for material event risk signals.",
110|    rapidHost: "sec-8-k-risk-signals",
111|    price: "0.10",
112|    params: [
113|      { name: "symbol", type: "string", description: "Stock ticker symbol (e.g. 'AAPL', 'GOOGL')", required: true },
114|    ],
115|  },
116|  "trading-signals": {
117|    description: "Trading signals from Traders Hub. Get buy/sell signals with entry, stop-loss, and take-profit levels.",
118|    rapidHost: "traders-hub-trading-signals5",
119|    price: "0.12",
120|    params: [
121|      { name: "symbol", type: "string", description: "Trading pair or ticker (e.g. 'BTCUSD', 'EURUSD', 'AAPL')", required: true },
122|    ],
123|  },
124|  "username-check": {
125|    description: "Username availability checker across platforms. Check if a username is available on major social media and tech platforms.",
126|    rapidHost: "username-availability-checker2",
127|    price: "0.05",
128|    params: [
129|      { name: "username", type: "string", description: "The username to check availability for", required: true },
130|    ],
131|  },
132|};
133|
134|function buildParamProperties(params: ParamDef[]) {
135|  const properties: Record<string, any> = {};
136|  for (const p of params) {
137|    properties[p.name] = {
138|      type: p.type,
139|      description: p.description,
140|    };
141|  }
142|  return properties;
143|}
144|
145|function buildRequiredParams(params: ParamDef[]): string[] {
146|  return params.filter((p) => p.required).map((p) => p.name);
147|}
148|
149|function buildQueryParameters(params: ParamDef[]) {
150|  return params.map((p) => ({
151|    name: p.name,
152|    in: "query" as const,
153|    required: !!p.required,
154|    schema: { type: p.type },
155|    description: p.description,
156|  }));
157|}
158|
159|function buildPaths() {
160|  const paths: Record<string, any> = {};
161|
162|  for (const [name, ep] of Object.entries(endpoints)) {
163|    const pathKey = `/api/${name}`;
164|    const properties = buildParamProperties(ep.params);
165|    const required = buildRequiredParams(ep.params);
166|
167|    paths[pathKey] = {
168|      get: {
169|        summary: `GET /api/${name}`,
170|        description: ep.description,
171|        "x-payment-info": {
172|          price: { mode: "fixed", currency: "USD", amount: ep.price },
173|        },
174|        protocols: [{ x402: {} }],
175|        parameters: buildQueryParameters(ep.params),
176|        responses: {
177|          "200": {
178|            description: "Success — returns proxied RapidAPI response",
179|            content: {
180|              "application/json": {
181|                schema: {
182|                  type: "object",
183|                  description:
184|                    "Response shape varies by endpoint. The raw upstream JSON is returned as-is.",
185|                  additionalProperties: true,
186|                },
187|              },
188|            },
189|          },
190|          "402": {
191|            description:
192|              "Payment required — includes Payment-Required header with base64-encoded x402 payment instructions",
193|            content: {
194|              "application/json": {
195|                schema: {
196|                  type: "object",
197|                  properties: {
198|                    error: { type: "string" },
199|                    reason: { type: "string" },
200|                  },
201|                },
202|              },
203|            },
204|          },
205|        },
206|      },
207|      post: {
208|        summary: `POST /api/${name}`,
209|        description: ep.description,
210|        "x-payment-info": {
211|          price: { mode: "fixed", currency: "USD", amount: ep.price },
212|        },
213|        protocols: [{ x402: {} }],
214|        requestBody: {
215|          required: true,
216|          content: {
217|            "application/json": {
218|              schema: {
219|                type: "object",
220|                properties,
221|                ...(required.length > 0 ? { required } : {}),
222|              },
223|            },
224|          },
225|        },
226|        responses: {
227|          "200": {
228|            description: "Success — returns proxied RapidAPI response",
229|            content: {
230|              "application/json": {
231|                schema: {
232|                  type: "object",
233|                  description:
234|                    "Response shape varies by endpoint. The raw upstream JSON is returned as-is.",
235|                  additionalProperties: true,
236|                },
237|              },
238|            },
239|          },
240|          "402": {
241|            description:
242|              "Payment required — includes Payment-Required header with base64-encoded x402 payment instructions",
243|            content: {
244|              "application/json": {
245|                schema: {
246|                  type: "object",
247|                  properties: {
248|                    error: { type: "string" },
249|                    reason: { type: "string" },
250|                  },
251|                },
252|              },
253|            },
254|          },
255|        },
256|      },
257|    };
258|  }
259|
260|  return paths;
261|}
262|
263|export async function GET() {
264|  const spec = {
265|    openapi: "3.1.0",
266|    info: {
267|      title: "x402-alert",
268|      version: "1.0.0",
269|      description:
270|        "x402 payment-gated financial and market data APIs backed by RapidAPI. Each request requires an x402 micropayment on Base (USDC) before data is returned.",
271|      contact: {
272|        email: "sna4an@proton.me",
273|      },
274|      "x-guidance":
275|        "Send a GET or POST request to any /api/* endpoint without payment to receive 402 Payment Required with payment instructions. Include a valid PAYMENT-SIGNATURE header with an x402 payment payload to receive data.",
276|    },
277|    servers: [{ url: "https://x402-alert.vercel.app" }],
278|    paths: buildPaths(),
279|  };
280|
281|  return NextResponse.json(spec, {
282|    headers: {
283|      "Cache-Control": "public, max-age=3600",
284|      "Content-Type": "application/json",
285|    },
286|  });
287|}
288|