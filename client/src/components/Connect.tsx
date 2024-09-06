import { useNavigate } from 'react-router-dom';
import { useTellerConnect } from 'teller-connect-react';
import { useAuth } from '../contexts/AuthContext';

export default function Connect() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const {open, ready} = useTellerConnect({ 
    applicationId: import.meta.env.VITE_TELLER_APP_ID,
    environment: "sandbox",
    onSuccess: async (enrollment) => {
      try {
        const id = currentUser ? currentUser.uid : undefined;
        if (!id) {
          return;
        }
        let response = await fetch(`http://localhost:5050/user/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrollment),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        response = await fetch("http://localhost:5050/teller/enrollment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrollment),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error("Error sending Teller enrollment object to server", err)
      } finally {
        navigate("/home");
      }
    },
  });

  return (
    <div className="h-full flex justify-center items-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center font-bold text-5xl">
          Welcome to MyFinance!
        </div>
        <div className="text-center text-xl">
          Connect a bank account to get started.
        </div>
        <button
          onClick={() => open()} 
          disabled={!ready}
          className="w-30 px-8 py-3 mt-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          Connect
        </button>
      </div>
    </div>
  );
}