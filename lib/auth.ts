import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    // We're not using actual authentication, just session management
    {
      id: 'welcome',
      name: 'Welcome Session',
      type: 'credentials',
      credentials: {},
      async authorize() {
        // Always return a user object for session creation
        return {
          id: 'welcome-user',
          name: 'Welcome User',
          email: 'welcome@paltan.com'
        };
      }
    }
  ],
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60, // 1 year
  },
  cookies: {
    sessionToken: {
      name: 'paltan-session',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 365 * 24 * 60 * 60 // 1 year
      }
    }
  },
  pages: {
    signIn: '/welcome',
  },
  callbacks: {
    async jwt() {
      return {};
    },
    async session({ session }) {
      return session;
    }
  }
};
