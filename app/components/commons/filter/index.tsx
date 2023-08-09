import { ChangeEvent, useState } from "react";

export function NumberRangeFilter({ label, handler }: { label: string, handler: (min: number, max: number) => void }) {
  const [value, setValue] = useState({min: 0, max: 1000, maxChanged: false});


  const minChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, min: Number(e.target.value)});
    if (value.maxChanged) {
      handler(Number(e.target.value), value.max);
    }
  }
  const maxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, max: Number(e.target.value), maxChanged: true });
    if (value.maxChanged) {
      handler(value.min, Number(e.target.value));
    }
  }
  
  return (
    <div className="border-b border-t border-gray-200 py-3">
      <h3 className="-my-3 flow-root">
        <span className="font-thin text-white-600">{label}: </span>
      </h3>
      <div className="pt-6" id="filter-section-1">
        <div className="space-y-4">

          <input 
            placeholder="From" value={value.min} type="number" onChange={minChangeHandler}
            className="rounded text-sm text-gray-500" style={{width: '40%', height:'40', margin:'2%'}} 
          />

          <input 
            placeholder="To" value={value.max} type="number" onChange={maxChangeHandler}
            className="rounded text-sm text-gray-500" style={{width: '40%', height:'40', margin:'2%'}} 
          />

        </div>
      </div>
    </div>
  );
}

export function ColorFilter({ colors, handler }: { colors: Array<string> , handler: (color: string) => void}) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => e.target.checked === true && handler(e.target.value);
  
  return (
    <div className="border-b border-t border-gray-200 py-3">
      <h3 className="-my-3 flow-root">
        <span className="font-thin text-white-600">Color</span>
      </h3>
      <div className="pt-6" id="filter-section-1">
        <div className="space-y-4">

          {colors.map((color, index) => (
            <div className="flex items-center" key={index}>
              <input 
                id={`filter-category-${index}`} name="color" value={color} onChange={onChange} 
                type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
              />
              <label htmlFor="filter-category-0" className={`ml-3 text-sm text-${color.toLowerCase()}-600`}>{color}</label>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}