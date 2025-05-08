import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for setting Cache-Control headers
 */
export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();
  
  // Define cache settings based on content type
  const url = request.nextUrl.pathname;
  
  // Static assets (images, fonts, etc.) - longer cache
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|woff2|woff|ttf|eot)$/)) {
    response.headers.set(
      'Cache-Control', 
      'public, max-age=31536000, immutable' // 1 year
    );
  } 
  // JS and CSS files - shorter cache
  else if (url.match(/\.(js|css)$/)) {
    response.headers.set(
      'Cache-Control', 
      'public, max-age=86400, must-revalidate' // 1 day
    );
  } 
  // HTML and API routes - no cache or short cache
  else if (url.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control', 
      'no-store, must-revalidate'
    );
  } 
  // Default - moderate cache
  else {
    response.headers.set(
      'Cache-Control', 
      'public, max-age=3600, s-maxage=60' // 1 hour client, 1 min CDN
    );
  }

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};