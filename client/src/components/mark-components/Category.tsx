
export default function Category({ id, categoryName, color, selected, onToggle }) {

  return (
    <button 
      className="flex-shrink-0 flex justify-center items-center rounded-md gap-3 w-44 h-10 border"
      style={{backgroundColor: (selected ? "#cbd5e1" : "#f8fafc")}}
      onClick={() => onToggle(id)}
    >
      <div className="w-5 h-5 rounded-md border" style={{backgroundColor: color}}></div>
      <div className="w-28 text-lg truncate">{categoryName}</div>
    </button>
  );
}