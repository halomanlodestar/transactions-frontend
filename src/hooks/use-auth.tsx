/** @format */

import { API_URL } from "@/lib/constants";
import { redirect } from "@tanstack/react-router";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthError, FetchError } from "@/lib/errors";

interface AuthContextData {
  token?: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const a = (await axios.get(`${API_URL}/auth/me`)).data as string;
        setToken(a);
      } catch (error) {
        setToken(undefined);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    let res;

    try {
      res = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });
    } catch (error) {
      throw new FetchError("An Error Occurred");
    }

    if (res.status === 302) {
      throw redirect({
        to: "/",
      });
    }

    throw new AuthError("Invalid Credentials");
  };

  const signUp = async (name: string, email: string, password: string) => {
    let res;

    try {
      res = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
    } catch (error) {
      throw new FetchError("An Error Occurred");
    }

    if (res.status === 302) {
      throw redirect({
        to: "/",
      });
    }

    throw new AuthError("Email is already registered");
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
