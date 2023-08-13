import { useState } from "react";

export default function Label({ name, label, id }: { name: string, label: string, id: string }) {
  const [isVisibleTooltip, setVisiblity] = useState(false);
  
  return (
  <div 
    style={{cursor: "pointer"}} 
    onMouseEnter={() => setVisiblity(true)} 
    onMouseLeave={() => setVisiblity(false)}
  >
    <span 
      className="bg-gray-100 text-gray-800 text-xs my-1 font-small ml-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
    {label}
    </span>
    <div role="tooltip" 
      className={`absolute ${!isVisibleTooltip && 'invisible'} inline-block px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md`}
    >
      {name}
    </div>
  </div>
  );
}