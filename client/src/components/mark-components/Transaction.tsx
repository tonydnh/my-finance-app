
interface TransactionProps {
  id: string;
  date: string;
  description: string;
  amount: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export default function Transaction({ id, date, description, amount, selected, onToggle}: TransactionProps) {

  return (
    <button
      className="flex flex-shrink-0 justify-between items-center h-16 rounded-md"
      style={{backgroundColor: (selected ? "#cbd5e1" : "#f1f5f9")}}
      onClick={() => onToggle(id)}
    >
      <div className="text-xl ml-6">{date}</div>
      <div className="text-2xl">{description}</div>
      <div className="text-xl mr-6">{amount}</div>
    </button>
  );
}