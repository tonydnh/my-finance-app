import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const UserDataContext = createContext(null);

export function useUserData() {
  return useContext(UserDataContext);
}

// Fetch user data from database using useContext so it can be shared across different components
export function UserDataProvider({ children }) {
  // const [userInfo, setUserInfo] = useState(null);
  // const [userTransactions, setUserTransactions] = useState(null);
  // const [userCategories, setUserCategories] = useState(null);
  const [newCategoryMade, setNewCategoryMade] = useState(false); // Switch between true/false to detect new categories made
  const { currentUser } = useAuth();

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ?  JSON.parse(storedUserInfo) : null;
  });

  const [userTransactions, setUserTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("userTransactions");
    return storedTransactions ?  JSON.parse(storedTransactions) : null;
  });

  const [userCategories, setUserCategories] = useState(() => {
    const storedCategories = localStorage.getItem("userCategories");
    return storedCategories ?  JSON.parse(storedCategories) : null;
  });

  // Fetch user info if not available in localStorage
  useEffect(() => {
    async function fetchUserInfo() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id || userInfo) {
        return;
      }
      
      console.log("user info fetched");
      const response = await fetch(`http://localhost:5050/users/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }

      const fetchedUserInfo = await response.json();
      setUserInfo(fetchedUserInfo);
      localStorage.setItem("userInfo", JSON.stringify(fetchedUserInfo));
    }

    fetchUserInfo();
  }, [currentUser, userInfo]);

  // Fetch transactions if not available in localStorage
  useEffect(() => {
    async function fetchUserTransactions() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id || userTransactions) {
        return;
      }

      console.log("user transactions fetched");
      const response = await fetch(`http://localhost:5050/finances/transactions/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred while fetching transactions: ${response.statusText}`);
        return;
      }
      
      const fetchedTransactions = await response.json();
      setUserTransactions(fetchedTransactions);
      localStorage.setItem("userTransactions", JSON.stringify(fetchedTransactions));
    }

    fetchUserTransactions();
  }, [currentUser, userTransactions]);

  // Fetch categories when auth changes or a new category is made IF not available in localStorage
  useEffect(() => {
    async function fetchUserCategories() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id || (userCategories && !newCategoryMade)) {
        return;
      }

      console.log("user categories fetched");
      const response = await fetch(`http://localhost:5050/finances/categories/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred while fetching categories: ${response.statusText}`);
        return;
      }

      const fetchedCategories = await response.json();
      setUserCategories(fetchedCategories);
      localStorage.setItem("userCategories", JSON.stringify(fetchedCategories));
    }

    if (newCategoryMade) {
      setNewCategoryMade(false);
    }

    fetchUserCategories();
  }, [currentUser, userCategories, newCategoryMade]);

  const value = {
    setNewCategoryMade,
    userInfo,
    userTransactions,
    userCategories,
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}