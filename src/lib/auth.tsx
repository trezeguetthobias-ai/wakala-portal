import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type Ctx = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<Ctx>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkRole = async (userId: string) => {
    try {
      console.log("Checking role for user:", userId);
      
      // First check user_roles table
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      console.log("Role from user_roles table:", data);

      if (error) {
        console.error("Role fetch error:", error.message);
        // Fallback to metadata
        const { data: userData } = await supabase.auth.getUser();
        const role = userData?.user?.user_metadata?.role;
        console.log("Role from metadata (fallback):", role);
        setIsAdmin(role === "admin");
        return;
      }

      if (data?.role === "admin") {
        console.log("User is ADMIN from table!");
        setIsAdmin(true);
        return;
      }

      // If not in table, check metadata as fallback
      const { data: userData } = await supabase.auth.getUser();
      const role = userData?.user?.user_metadata?.role;
      console.log("Role from metadata (fallback):", role);
      setIsAdmin(role === "admin");
    } catch (err) {
      console.error("Error checking role:", err);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // 1. Listen auth changes
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, s) => {
      console.log("Auth state changed:", _event);
      setSession(s);
      setUser(s?.user ?? null);

      if (s?.user) {
        await checkRole(s.user.id);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    // 2. Initial session load
    supabase.auth.getSession().then(async ({ data }) => {
      console.log("Initial session load:", data.session?.user?.email);
      setSession(data.session);
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        await checkRole(data.session.user.id);
      }

      setLoading(false);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log("Signing out...");
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setLoading(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthCtx.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        signOut,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);