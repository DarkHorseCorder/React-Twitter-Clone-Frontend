import React from "react";
import { useQuery } from "react-query";
import Splash from "../components/Splash";
import { authenticate } from "../utils/api-client";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const { data, isLoading } = useQuery("AuthProvider", authenticate);

  if (isLoading) return <Splash />;

  const authUser = data || null;

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
}

export function useAuthUser() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthUser must be used within the AuthProvider component"
    );
  }

  return context;
}
