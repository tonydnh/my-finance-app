interface ConnectProps {
  onClick: () => void;
  disabled: boolean;
}

function Connect(props: ConnectProps) {

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center font-bold text-5xl">
        Welcome to MyFinance!
      </div>
      <div className="text-center text-xl">
        Connect a bank account to get started.
      </div>
      <button
        onClick={props.onClick} 
        disabled={props.disabled}
        className="w-30 px-8 py-3 mt-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        Connect
      </button>
    </div>
  );
}

export default Connect;