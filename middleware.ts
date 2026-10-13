import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host.includes("portfolio.sagetech.co.zw")) {
    const url = request.nextUrl.clone();
    url.host = "musonzahw.co.zw";
    url.protocol = "https:";
    url.port = "";
    if (url.pathname === "/home" || url.pathname === "/hero-landing") {
      url.pathname = "/";
    }
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
