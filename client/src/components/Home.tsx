import Option from './Option';

function Home() {

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="font-bold text-6xl mb-4">
        Hello!
      </div>

      <Option textLabel="Create a custom spending category" buttonLabel="Create" onClick={() => {}} />
      <Option textLabel="Mark transactions" buttonLabel="Mark" onClick={() => {}} />
      <Option textLabel="View Spending" buttonLabel="View" onClick={() => {}} />
    </div>
  );
}

export default Home;