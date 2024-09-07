import SignUpForm from './SignUpForm';
import { SignUpFormData } from './SignUpForm';
import { LogInFormData } from './LogInForm';
import LogInForm from './LogInForm';
import { useNavigate, useLocation } from 'react-router-dom';
import { logInUser, createUser } from '../firebase/auth';
import { useState } from 'react';
import { User } from 'firebase/auth';


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const isSigningUp = location.pathname === "/register";

  async function handleLogin(loginData: LogInFormData) {
    try {
      const userCredential = await logInUser(loginData.email, loginData.password);
      navigate("/connect");
    } catch (err) {
      setError("Email and/or password is incorrect.");
    }
  }

  async function handleSignUp(signUpData: SignUpFormData) {
    try {
      const userCredential =  await createUser(signUpData.email, signUpData.password);
      addUserToDatabase(userCredential.user, signUpData);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("That email is already associated with an account.");
      } else if (err.code === "auth/weak-password") {
        setError("Minimum password length is 6.");
      }
    }
  }

  async function addUserToDatabase(user: User, signUpData: SignUpFormData) {
    try {
      const response = await fetch("http://localhost:5050/users/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid, email: user.email, firstName: signUpData.firstName, lastName: signUpData.lastName}),
      });
      setError("");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error adding user to database: ", err);
    } finally {
      navigate("/connect")
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
          MyFinance
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