import { useState } from 'react';
import Category from './mark-components/Category';
import Transaction from './mark-components/Transaction';
import { useUserData } from '../contexts/UserDataContext';


export default function Mark() {
  const [mark, setMark] = useState(false);
  const { userCategories, userTransactions } = useUserData();

  const categories = [];
  if (userCategories) {
    userCategories.forEach((category, index) => {
      categories.push(
        <Category key={index} categoryName={category.categoryName} color={category.color} />
      );
    });
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
            {/* Scrollable Container */}
            <div className="flex flex-col h-[34rem] gap-2 p-2 overflow-y-auto">
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
              <Transaction date={"8/15/2024"} details={"AMAZON PURCHASE"} amount={"$70.25"} />
            </div>
            <button
              type="submit"
              className="self-center w-36 px-8 py-3 mt-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 shadow-sm"
            >
              {mark ? "Mark" : "Done"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}