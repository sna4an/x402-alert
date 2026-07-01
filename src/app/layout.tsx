import "./globals.css";

export const metadata = {
  title: "x402 Alert - Financial Alerts & Monitoring API Hub",
  description: "14 paid financial API endpoints. Pay with USDC on Base using x402 protocol.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
