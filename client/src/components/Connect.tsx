import { useNavigate } from 'react-router-dom';
import { useTellerConnect } from 'teller-connect-react';

export default function Connect() {
  const navigate = useNavigate();

  const {open, ready} = useTellerConnect({ 
    applicationId: import.meta.env.VITE_TELLER_APP_ID,
    environment: "sandbox",
    onSuccess: (enrollment) => {
      console.log(`User enrolled successfully. Their access token: ${enrollment.accessToken}`);
      console.log(enrollment);
      navigate("/home");
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center p-6">
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