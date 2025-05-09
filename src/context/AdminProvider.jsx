import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <AdminContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const AdminState = () => {
  return useContext(AdminContext);
};

