import { ReactNode, createContext, useContext } from "react";

export interface SignupInput {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextType {
  user: any;
  isLoading: boolean;
  error: Error | null;
  isLoggedIn: boolean;
  signup: (input: SignupInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = {
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
  };

  const signup = async (input: SignupInput) => {};
  const login = async (input: LoginInput) => {};
  const logout = async () => {};

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
