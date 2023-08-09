export default function Label({ name, label }: { name: string, label: string }) {
  
  return (
  <>
    <span data-tooltip-target={`tooltip-${name}`} className="bg-gray-100 text-gray-800 text-xs my-1 font-small ml-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
    {label}
    </span>
    <div id={`tooltip-${name}`} role="tooltip" className="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md shadow-sm opacity-0 tooltip">
      {name}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  </>
  );
}