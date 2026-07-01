import { NextRequest, NextResponse } from "next/server";

const EVM_ADDRESS = process.env.EVM_ADDRESS || "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c";

export async function proxy(req: NextRequest, rapidHost: string, atomicPrice: number) {
  const paymentHeader = req.headers.get("x-payment");
  
  if (!paymentHeader) {
    const paymentRequired = {
      x402Version: 1,
      accepts: [
        {
          scheme: "exact",
          network: "eip155:8453",
          maxAmountRequired: String(atomicPrice),
          resource: req.url,
          description: "Access to " + rapidHost + " data",
          mimeType: "application/json",
          payTo: EVM_ADDRESS,
          extra: {
            name: "USD Coin",
            version: "2"
          }
        }
      ]
    };
    const encoded = Buffer.from(JSON.stringify(paymentRequired)).toString("base64");
    return NextResponse.json(
      { error: "Payment required", paymentRequired },
      {
        status: 402,
        headers: { "Payment-Required": encoded }
      }
    );
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.replace(/^\/api\/[a-z-]+/, "");
    const rapidUrl = "https://" + rapidHost + ".p.rapidapi.com" + pathParts + url.search;
    
    const rapidKey = process.env.RAPIDAPI_KEY || "";
    const headers: Record<string, string> = {
      "x-rapidapi-key": rapidKey,
      "x-rapidapi-host": rapidHost + ".p.rapidapi.com",
      "Content-Type": "application/json"
    };

    const body = req.method === "POST" || req.method === "PUT" || req.method === "PATCH"
      ? await req.text()
      : undefined;

    const resp = await fetch(rapidUrl, {
      method: req.method,
      headers,
      body
    });

    const data = await resp.text();
    return new NextResponse(data, {
      status: resp.status,
      headers: { "Content-Type": resp.headers.get("content-type") || "application/json" }
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Proxy error", message: err.message }, { status: 502 });
  }
}
