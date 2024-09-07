
export default function Category({ categoryName, color }) {

  return (
    <button className="flex-shrink-0 flex justify-center items-center rounded-md gap-3 w-44 h-10 border bg-slate-50">
      <div className="w-5 h-5 rounded-md" style={{backgroundColor: color}}></div>
      <div className="w-28 text-lg truncate">{categoryName}</div>
    </button>
  );
}