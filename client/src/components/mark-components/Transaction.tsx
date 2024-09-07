
export default function Transaction({ date, details, amount }) {

  return (
    <button className="bg-slate-100 flex flex-shrink-0 justify-between items-center h-16 rounded-md">
      <div className="text-xl ml-6">{date}</div>
      <div className="text-2xl">{details}</div>
      <div className="text-xl mr-6">{amount}</div>
    </button>
  );
}