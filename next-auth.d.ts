import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username?: string | null;
      id?: string | null;
    } & DefaultSession['user'];
    error?: string | null;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    username?: string | null;
    id?: string | null;
    error?: string | null;
  }
}
