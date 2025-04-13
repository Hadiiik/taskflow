// /middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getJwtUser } from "./server_helpers/get_jwt_user";

export function middleware(req: NextRequest) {






  return NextResponse.next();
  }
  
  // تحديد المسارات التي سيتم تطبيق الـ middleware عليها
  // في هذه الحالة، نطبق الـ middleware على كل المسارات بما في ذلك الـ API
  export const config = {
    matcher: [
      // Match all paths except:
      // - API routes (api)
      // - Static files (_next/static, _next/image)
      // - Metadata files (favicon.ico, sitemap.xml, robots.txt)
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)', 
      // Explicitly include API routes
      '/api/:path*',
    ],
  };
  