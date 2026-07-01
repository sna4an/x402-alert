import { NextRequest } from "next/server";
import { proxy } from "../../../lib/proxy";

const RAPID_HOST = "defi-yield-honesty-real-apy";
const ATOMIC_PRICE = 90000;

export async function GET(req: NextRequest) {
  return proxy(req, RAPID_HOST, ATOMIC_PRICE);
}

export async function POST(req: NextRequest) {
  return proxy(req, RAPID_HOST, ATOMIC_PRICE);
}

export async function PUT(req: NextRequest) {
  return proxy(req, RAPID_HOST, ATOMIC_PRICE);
}

export async function PATCH(req: NextRequest) {
  return proxy(req, RAPID_HOST, ATOMIC_PRICE);
}

export async function DELETE(req: NextRequest) {
  return proxy(req, RAPID_HOST, ATOMIC_PRICE);
}
