import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Each demo lives on its own subdomain (salon.codecraft.ba → /salon). On *.vercel.app and localhost
// the demos are reached by path instead, so only known subdomains are rewritten.
const demos = new Set(["salon", "restoran", "fitness", "shop"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const sub = host.split(".")[0];
  if (!demos.has(sub) || host.endsWith(".vercel.app")) return;

  const { pathname } = request.nextUrl;
  if (pathname === `/${sub}` || pathname.startsWith(`/${sub}/`)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${sub}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and static files
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
