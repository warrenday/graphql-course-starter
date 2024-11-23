import { ReactNode, createContext, useContext } from "react";
import {
  MeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useSignupMutation,
} from "./queries.generated";
import { UserRole } from "../../types/graphql";

export interface SignupInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextType {
  user: MeQuery["me"] | null;
  isLoading: boolean;
  error: Error | null;
  isLoggedIn: boolean;
  signup: (input: SignupInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useMeQuery({
    fetchPolicy: "network-only", // Don't use cache for auth status
  });

  const value = {
    user: data?.me || null,
    isLoading: loading,
    error: error || null,
    isLoggedIn: !!data?.me,
  };

  const [signupMutation] = useSignupMutation();
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const signup = async (input: SignupInput) => {
    await signupMutation({
      variables: { input },
    });
  };
  const login = async (input: LoginInput) => {
    await loginMutation({ variables: { input } });
  };
  const logout = async () => {
    await logoutMutation();
  };

  return (
    <AuthContext.Provider value={{ ...value, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
