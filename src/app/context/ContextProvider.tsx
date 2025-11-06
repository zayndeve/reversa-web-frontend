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
     // 🔥 Don't rely on just cookies - load from localStorage
    // The App.tsx will validate the session by calling getMyDetails()
    const stored = localStorage.getItem("memberData");
    if (stored) {
      try {
        setAuthMember(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse memberData from localStorage");
        setAuthMember(null);
      }
    } else {
      setAuthMember(null);
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
