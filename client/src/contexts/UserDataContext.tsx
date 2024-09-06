import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const UserDataContext = createContext(null);

export function useUserData() {
  return useContext(UserDataContext);
}

// Fetch user data from database using useContext so it can be shared across different components
export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id) {
        return;
      }

      const response = await fetch(`http://localhost:5050/user/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }

      const userData = await response.json();
      if (!userData) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setUserData(userData);
    }

    fetchData();
  }, [currentUser, navigate]);

  const value = {
    userData
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}