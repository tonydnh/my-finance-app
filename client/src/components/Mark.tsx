import { useState } from 'react';
import Category from './mark-components/Category';
import Transaction from './mark-components/Transaction';
import { useUserData } from '../contexts/UserDataContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Mark() {
  const { userCategories, userTransactions } = useUserData();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Stores the IDs of selected categories
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]); // Stores the IDs of selected transactions
  const [showMarkOption, setShowMarkOption] = useState(false);
  const { currentUser } = useAuth();
  const { setUpdateCategory } = useUserData();
  const navigate = useNavigate();

  // Toggle category selection
  function handleCategoryToggle(categoryId: string) {
    setSelectedCategories(prevSelected => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter(id => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  }

  // Toggle transaction selection
  function handleTransactionToggle(transactionId: string) {
    setSelectedTransactions(prevSelected => {
      const newTransactions = prevSelected.includes(transactionId)
        ? prevSelected.filter(id => id !== transactionId)
        : [...prevSelected, transactionId];
      
        if (newTransactions.length == 0) {
          // No transaction
          setShowMarkOption(false);
        } else {
          // User just marked transactions
          setShowMarkOption(true);
        }

        return newTransactions;
    });
  }
  
  // Display the categories
  const categories: JSX.Element[] = [];
  if (userCategories) {
    userCategories.forEach((category, index) => {
      categories.push(
        <Category 
          key={index} 
          id={category.id}
          categoryName={category.categoryName} 
          color={category.color}
          selected={selectedCategories.includes(category.id)}
          onToggle={handleCategoryToggle}
        />
      );
    });
  }

  // Display the transactions
  const transactions: JSX.Element[] = [];
  if (userTransactions) {
    userTransactions.forEach((transaction, index) => {
      transactions.push(
        <Transaction
          key={index} 
          id={transaction.id}
          date={transaction.date} 
          description={transaction.description} 
          amount={"$" + transaction.amount.substring(1)}
          selected={selectedTransactions.includes(transaction.id)}
          onToggle={handleTransactionToggle}
        />
      );
    });
  }

  async function handleButtonPress() {
    if (showMarkOption) {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id) {
        return;
      }

      const transactionObjects = userTransactions.filter(transaction => selectedTransactions.includes(transaction.id));
      
      // Calculate sum of transactions
      let totalCost = 0
      transactionObjects.forEach(transaction => totalCost += parseFloat(transaction.amount));
      // Negative sum because Teller stores amounts as negatives
      totalCost *= -1;
      totalCost = parseFloat(totalCost.toFixed(2)); // Round to 2 decimal places

      for (const categoryId of selectedCategories) {
        try {
          await fetch(`http://localhost:5050/finances/markTransactions/${id}/${categoryId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ transactions: transactionObjects, total: totalCost }),
          });
          console.log(transactionObjects);
        } catch (err) {
          console.error("Error marking transaction", err);
        }
      }

      // Fetch updated categories to localStorage
      setUpdateCategory(true);
      // Show Done button after marking UNTIL more transactions are selected/unselected
      setShowMarkOption(false);
      
    } else {
      navigate("/home");
    }
  }

  return (
    <div className="h-full overflow-y-hidden">
      <div className="flex flex-col h-full"> 
        <div className="flex h-full">

          <div className="flex flex-col gap-3 p-8">
            <div className="text-2xl font-medium">Your Categories</div>
            <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden h-[40rem]">
              {categories}
            </div>
          </div>
          
          <div className="w-[1px] h-6/7 bg-slate-300 my-6"></div>

          <div className="w-full flex flex-col gap-3 p-6">
            <div className="text-3xl font-medium text-center">Transactions</div>
            <div className="flex flex-col h-[34rem] gap-2 p-2 overflow-y-auto">
              {transactions}
            </div>
            <button
              className="self-center w-36 px-8 py-3 mt-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 shadow-sm"
              onClick={handleButtonPress}
            >
              {showMarkOption && selectedTransactions.length > 0 ? "Mark" : "Done"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}