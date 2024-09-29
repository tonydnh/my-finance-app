import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../contexts/UserDataContext';
import { v4 as uuidv4 } from "uuid";

interface CategoryFormData {
  categoryName: string,
  description: string,
  color: string,
}

export default function Create() {
  const { register, handleSubmit, formState: {errors} } = useForm<CategoryFormData>();
  const { currentUser } = useAuth();
  const { setUpdateCategory } = useUserData();
  const navigate = useNavigate();

  async function onSubmit(data: CategoryFormData) {
    // Send category to backend to add to database
    try {
      const id = currentUser ? currentUser.uid : undefined;
      if (!id) {
        return;
      }

      await fetch(`http://localhost:5050/finances/addCategory/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: {
            id: uuidv4(),
            categoryName: data.categoryName,
            description: data.description,
            color: data.color,
            total: 0,
            transactions: [],
          },
        }),
      });
    } catch (err) {
      console.error("Error adding category to database: ", err);
    } finally {
      setUpdateCategory(true);
      navigate("/mark");
    }
  }

  return (
    <div className="h-full overflow-y-hidden flex justify-center">
      <div className="h-fit w-[32rem] mt-24 p-6 shadow-md border border-slate-300 rounded-md">
        <div className="font-bold text-2xl md:text-4xl">  
          Create Spending Category
        </div>
        <div className="text-xl mb-4">
          Track your spending on custom categories.
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-1"> 
            <label htmlFor="categoryName">Category Name</label>
            <input 
              type="text"
              {...register("categoryName", { required: "This is required." })}
              id="categoryName"
              className="border border-slate-300 rounded py-1.5 pl-1 text-slate-900 placeholder:text-slate-400"
              placeholder="Ex: Apartment"
            />
            <p className="text-red-500">{typeof errors.categoryName?.message === "string" ? errors.categoryName.message : ""}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              {...register("description", { required: "This is required." })}
              id="description"
              className="border border-slate-300 rounded py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 resize-none"
              placeholder="Describe the category"
            />
            <p className="text-red-500">{typeof errors.description?.message === "string" ? errors.description.message : ""}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="color">Color</label>
            <input
              type="color"
              {...register("color")}
              id="color"
              defaultValue="#2a9df4"
              className="rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="w-36 self-center px-8 py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 shadow-sm"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}