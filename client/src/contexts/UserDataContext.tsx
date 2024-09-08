import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const UserDataContext = createContext(null);

export function useUserData() {
  return useContext(UserDataContext);
}

// Fetch user data from database using useContext so it can be shared across different components
export function UserDataProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [userTransactions, setUserTransactions] = useState(null);
  const [userCategories, setUserCategories] = useState(null);
  const [newCategoryMade, setNewCategoryMade] = useState(false); // Switch between true/false to detect new categories made
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchUserInfo() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id) {
        return;
      }

      const response = await fetch(`http://localhost:5050/users/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }

      const userInfo = await response.json();
      setUserInfo(userInfo);
    }

    async function fetchUserTransactions() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id) {
        return;
      }

      const response = await fetch(`http://localhost:5050/finances/transactions/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred while fetching transactions: ${response.statusText}`);
        return;
      }

      const transactions = await response.json();
      setUserTransactions(transactions);
    }

    fetchUserInfo();
    fetchUserTransactions();
  }, [currentUser]);

  // Fetch categories when auth changes or a new category is made
  useEffect(() => {
    async function fetchUserCategories() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id) {
        return;
      }

      const response = await fetch(`http://localhost:5050/finances/categories/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred while fetching categories: ${response.statusText}`);
        return;
      }

      const categories = await response.json();
      setUserCategories(categories);
    }

    fetchUserCategories();
  }, [currentUser, newCategoryMade]);

  const value = {
    newCategoryMade,
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