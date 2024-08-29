import SignUpForm from './SignUpForm';
import { SignUpFormData } from './SignUpForm';
import { LogInFormData } from './LogInForm';
import LogInForm from './LogInForm';
import { useNavigate, useLocation } from 'react-router-dom';
import { logInUser, createUser } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';


export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const isSigningUp = location.pathname === "/register";

  async function handleLogin(loginData: LogInFormData) {
    try {
      console.log(loginData);
      const userCrediential = await logInUser(loginData.email, loginData.password);
    } catch (err) {
      setError("Email and/or password is incorrect.");
    }
  }

  async function handleSignUp(signUpData: SignUpFormData) {
    try {
      console.log(signUpData);
      const userCrediential =  await createUser(signUpData.email, signUpData.password);
      setError("");
    } catch (err) {
      setError("Minimum password length is 6.");
    }
  }

  function toggleForm() {
    if (isSigningUp) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-6 gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-center text-slate-900 font-bold text-5xl">
          Welcome to MyFinance!
        </div>
        <div className="text-center font-extralight text-xl">
          Log in to get started.
        </div>
      </div>

      {isSigningUp ? <SignUpForm onSubmit={handleSignUp} errorMsg={error} /> : <LogInForm onSubmit={handleLogin} errorMsg={error} />}

      <div>
        {isSigningUp ? 
        <p>Already have an account? <button className="text-blue-500 underline" onClick={toggleForm}>Log in</button></p> : 
        <p>Need an account? <button className="text-blue-500 underline" onClick={toggleForm}>Sign up</button></p>
        }
      </div>
    </div>
  );
}