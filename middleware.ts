import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const sessionTokenKey =
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token";
      const sessionToken = req.cookies.get(sessionTokenKey);

      return sessionToken != undefined;
    },
  },
});

export const config = { matcher: ["/dashboard/:path*"] };
