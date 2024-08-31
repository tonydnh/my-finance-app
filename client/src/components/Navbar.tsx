import { doSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  async function signUserOut() {
    await doSignOut();
    navigate("/login");
  }

  return (
    <div className="flex py-4 border-b border-solid border-slate-300 mx-4">
      <div className="text-3xl font-semibold">
        MyFinance
      </div>
      <button
        onClick={signUserOut}
        className="ml-auto px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        Sign Out
      </button>
    </div>
  );
}