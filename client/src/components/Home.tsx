import { useNavigate } from 'react-router-dom';
import Option from './Option';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="font-bold text-6xl mb-4">
        Hello!
      </div>

      <Option textLabel="Create a custom spending category" buttonLabel="Create" onClick={() => navigate("/create")} />
      <Option textLabel="Mark transactions" buttonLabel="Mark" onClick={() => {}} />
      <Option textLabel="View Spending" buttonLabel="View" onClick={() => {}} />
    </div>
  );
}