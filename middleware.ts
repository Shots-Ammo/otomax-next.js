import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
});
 
export const config = {
  // Matches all routes except api, static files, and vercel internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};