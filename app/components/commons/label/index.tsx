export default function Label({ name, label, id }: { name: string, label: string, id: string }) {
  
  return (
  <div style={{cursor: "pointer"}}>
    <span 
      data-tooltip-target={`tooltip-${id}`} data-tooltip-style="dark" data-tooltip-placement="top"
      className="bg-gray-100 text-gray-800 text-xs my-1 font-small ml-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
    {label}
    </span>
    <div id={`tooltip-${id}`} role="tooltip" className="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md shadow-sm opacity-0 tooltip">
      {name}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
  );
}