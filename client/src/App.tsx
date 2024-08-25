import { useTellerConnect } from 'teller-connect-react';
import './App.css';
import Connect from './components/Connect';

function App() {
  const {open, ready} = useTellerConnect({ 
    applicationId: import.meta.env.VITE_TELLER_APP_ID,
    environment: "sandbox",
    onSuccess: (authorization) => {
      console.log(`User enrolled successfully. Their access token: ${authorization.accessToken}`);
    },
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center p-6">
      <Connect onClick={open} disabled={!ready} />

    </div>
  )
}

export default App;
