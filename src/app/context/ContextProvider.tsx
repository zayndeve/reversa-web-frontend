import React, { ReactNode, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../libs/types/member";
import { GlobalContext } from "../hooks/useGlobal";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  const [authMember, setAuthMember] = useState<Member | null>(null);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true); // 🔥

  useEffect(() => {
    const token = cookies.get("accessToken");
    
    // 🔥 IMPORTANT: If NO token in cookies, ALWAYS clear localStorage
    // This prevents stale data from showing logged-in state
    if (!token) {
      localStorage.removeItem("memberData");
      setAuthMember(null);
    } else {
      // ✅ Only load localStorage if token exists
      // The token's validity will be verified by App.tsx calling getMyDetails()
      const stored = localStorage.getItem("memberData");
      if (stored) {
        try {
          setAuthMember(JSON.parse(stored));
        } catch (err) {
          console.error("Failed to parse memberData from localStorage");
          setAuthMember(null);
        }
      }
    }
    setIsLoading(false); // ✅ context is ready
  }, []);

  if (isLoading) return null; // 👈 wait for localStorage to load

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
