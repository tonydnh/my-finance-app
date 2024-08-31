import { useNavigate, useParams } from 'react-router-dom';
import Option from './Option';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doSignOut } from '../firebase/auth';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  const [record, setRecord] = useState(null);

  // Fetch the database records for this user
  useEffect(() => {
    async function fetchData() {
      const id = currentUser.uid || undefined;
      if (!id) {
        return;
      }

      const response = await fetch(`http://localhost:5050/user/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setRecord(record);
      console.log(`Record found: ${record}`);
    }

    fetchData();
  }, [currentUser, navigate]);

  async function signUserOut() {
    await doSignOut();
    console.log(currentUser);
    navigate("/login");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      {record && (
        <div className="font-bold text-6xl mb-4">
          Hello, {record.firstName}!
        </div>
      )}

      <Option textLabel="Create a custom spending category" buttonLabel="Create" onClick={() => navigate("/create")} />
      <Option textLabel="Mark transactions" buttonLabel="Mark" onClick={() => {}} />
      <Option textLabel="View Spending" buttonLabel="View" onClick={() => {}} />
    </div>
  );
}