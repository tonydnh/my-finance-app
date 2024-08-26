
interface OptionProps {
  textLabel: string,
  buttonLabel: string,
  onClick: () => void,
}

function Option(props: OptionProps) {
  return (
    <div className="flex flex-col items-center">
      <div>
        {props.textLabel}
      </div>
      <button
        className="w-36 px-8 py-3 mt-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {props.buttonLabel}
      </button>
  </div>
  );
}

export default Option;