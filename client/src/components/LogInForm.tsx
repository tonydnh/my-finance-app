import { useForm } from 'react-hook-form';

export interface LogInFormData {
  email: string,
  password: string,
}

interface LogInFormProps {
  onSubmit: (data: LogInFormData) => void,
  errorMsg: string,
}

export default function LogInForm({ onSubmit, errorMsg }: LogInFormProps) {
  const { register, handleSubmit, formState: {errors} } = useForm<LogInFormData>();

  function onFormSubmit(data: LogInFormData) {
    onSubmit(data);
  }

  return (
    <form 
      className="w-[20rem] flex flex-col gap-2 border border-slate-200 rounded-md p-4 shadow-md"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="text-center font-medium text-3xl mb-1">
        Log In
      </div>

      <div className="flex flex-col gap-1"> 
        <label htmlFor="email" className="lbl">Email</label>
        <input 
          type="email"
          {...register("email", { required: "This is required." })}
          id="email"
          className="border border-slate-300 rounded py-1.5 pl-1 text-slate-900 placeholder:text-slate-400"
          placeholder="Email"
        />
        <p className="text-red-500">{typeof errors.email?.message === "string" ? errors.email.message : ""}</p>
      </div>

      <div className="flex flex-col gap-1"> 
        <label htmlFor="password" className="lbl">Password</label>
        <input 
          type="password"
          {...register("password", { required: "This is required." })}
          id="password"
          className="border border-slate-300 rounded py-1.5 pl-1 text-slate-900 placeholder:text-slate-400"
          placeholder="Password"
        />
        <p className="text-red-500">{typeof errors.password?.message === "string" ? errors.password.message : ""}</p>
      </div>

      <p className="text-red-500">{errorMsg}</p>

      <button
        type="submit"
        className="w-full px-8 py-3 mt-3 self-center bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 shadow-sm font-medium"
      >
        Log In
      </button>
    </form>
  );
}