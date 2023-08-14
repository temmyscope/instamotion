import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

export function SelectFilter(
  { label, options, handler, nullStateHandler }: { 
    label: string, options: Array<string|number>, 
    handler: (value: string) => void, nullStateHandler: () => void
  }
) {
  const [value, setValue] = useState('');

  const id = label.split(" ").join("-");

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    //unselected state 
    if (e.target.value !== '') {
      setValue(e.target.value);
      handler(e.target.value);
    }else{
      setValue('');
      nullStateHandler();
    }
  }

  return (
  <div className="my-2 border-b">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <select 
      id={id} value={value} onChange={onChangeHandler}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value={``}>Select an option </option>
      {options.map((option, idx) => (
        <option value={`${option}`} key={idx}>
          {option}
        </option>
      ))}
    </select>
  </div>
  )
}

export function NumberRangeFilter({ label, handler }: { label: string, handler: (min: number, max: number) => void }) {
  const [value, setValue] = useState({min: 0, max: 1000, maxChanged: false});

  const id = label.split(" ").join("-");


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
    <div className="border-b border-gray-200 py-3">
      <h3 className="-my-3 flow-root">
        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}: </span>
      </h3>
      <div className="pt-6" id="filter-section-1">
        <div className="space-y-4">

          <input 
            placeholder="From" value={value.min} onChange={minChangeHandler} id={`${id}-from`}
            className="rounded text-sm text-gray-500" style={{width: '40%', height:'40', margin:'2%'}} 
          />

          <input 
            placeholder="To" value={value.max} onChange={maxChangeHandler} id={`${id}-to`}
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
        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</span>
      </h3>
      <div className="pt-6" id="filter-section-1">
        <div className="space-y-4">

          {colors.map((color, index) => (
            <React.Fragment key={index}>
            {color !== null && (
            <div className="flex items-center">
              <input 
                id={`color-filter-${index}`} name="color" value={color} onChange={onChange} 
                type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
              />
              <label htmlFor={`color-filter-${index}`} className={`ml-3 text-sm text-${color.toLowerCase()}-600`}>{color}</label>
            </div>
            )}
            </React.Fragment>
          ))}

        </div>
      </div>
    </div>
  );
}