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
    if (!token) {
      localStorage.removeItem("memberData");
      setAuthMember(null);
    } else {
      const stored = localStorage.getItem("memberData");
      if (stored) setAuthMember(JSON.parse(stored));
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
