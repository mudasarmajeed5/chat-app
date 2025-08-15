import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { convexAuth } from "@convex-dev/auth/server";
const isSignInPage = createRouteMatcher(["/auth/sign-in"])
const isProtectedRoute = createRouteMatcher(["/"])

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const onSignIn = isSignInPage(request);
  const isAuth = await convexAuth.isAuthenticated();
  if (onSignIn && isAuth) {
    return nextjsMiddlewareRedirect(request, '/')
  }
  if(!onSignIn && !isAuth){
    return nextjsMiddlewareRedirect(request, '/auth/sign-in')
  }
  return;
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};