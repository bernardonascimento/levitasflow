import type { NextRequest } from "next/server";
import { updateSession } from "@web/lib/supabase/middleware";

export const middleware = async (request: NextRequest) => {
  return updateSession(request);
};

export const config = {
  matcher: ["/app/:path*", "/login", "/signup"]
};
