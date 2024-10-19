import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/"
]);

// export function middleware(request: NextRequest) {
//   const corsOrigins = ["http://localhost:8080"];
//   const headers = new Headers(request.headers);
//   headers.set("x-current-path", request.nextUrl.pathname);
//   const origin = request.headers.get("origin");
//   const res = NextResponse.next();

//   // Set CORS headers
//   res.headers.set("Access-Control-Allow-Credentials", "true");
//   res.headers.set("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
//   res.headers.set(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );

//   if (corsOrigins.includes("*") || corsOrigins.includes(origin || "")) {
//     res.headers.set("Access-Control-Allow-Origin", origin || "*");
//   }

//   return res;
// }

export default clerkMiddleware((auth, req, res) => {
  if (!isPublicRoutes(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};
