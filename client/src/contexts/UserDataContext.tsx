import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

const UserDataContext = createContext<UserDataContextType | null>(null);

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === null) {
    throw new Error("useUserData must be used within an UserDataProvider");
  }
  return context;
}

interface TransactionType {
  id: number;
  date: string;
  description: string;
  amount: string;
}

interface Category {
  categoryName: string;
  total: number;
  color: string;
  transactions: TransactionType[];
}

interface UserDataContextType {
  setUpdateCategory: (value: boolean) => void;
  userInfo: UserInfo;
  userTransactions: TransactionType[];
  userCategories: Category[];
}

interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
}


// Fetch user data from database using useContext so it can be shared across different components
export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [updateCategory, setUpdateCategory] = useState(false);
  const { currentUser } = useAuth();

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ?  JSON.parse(storedUserInfo) : null;
  });

  const [userTransactions, setUserTransactions] = useState<TransactionType[]>(() => {
    const storedTransactions = localStorage.getItem("userTransactions");
    return storedTransactions ?  JSON.parse(storedTransactions) : null;
  });

  const [userCategories, setUserCategories] = useState<Category[]>(() => {
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
      
      const fetchedTransactions: TransactionType[] = (await response.json() as TransactionType[]);
      setUserTransactions(fetchedTransactions);
      localStorage.setItem("userTransactions", JSON.stringify(fetchedTransactions));
    }

    fetchUserTransactions();
  }, [currentUser, userTransactions]);

  // Fetch categories when auth changes or a new category is made IF not available in localStorage
  useEffect(() => {
    async function fetchUserCategories() {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id || (userCategories && !updateCategory)) {
        return;
      }

      console.log("user categories fetched");
      const response = await fetch(`http://localhost:5050/finances/categories/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred while fetching categories: ${response.statusText}`);
        return;
      }

      const fetchedCategories: Category[] = (await response.json() as Category[]);
      setUserCategories(fetchedCategories);
      localStorage.setItem("userCategories", JSON.stringify(fetchedCategories));
    }

    if (updateCategory) {
      setUpdateCategory(false);
    }

    fetchUserCategories();
  }, [currentUser, userCategories, updateCategory]);

  const value = {
    setUpdateCategory,
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