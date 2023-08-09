

export function NumberRangeFilter({ label }: { label: string }) {
  
  return (
    <div className="border-b border-t border-gray-200 py-3">
      <h3 className="-my-3 flow-root">
        <span className="font-thin text-white-600">{label}: </span>
      </h3>
      <div className="pt-6" id="filter-section-1">
        <div className="space-y-4">

          <input 
            placeholder="From" value={""} type="number" 
            className="rounded text-sm text-gray-500" style={{width: '40%', height:'40', margin:'2%'}} 
          />

          <input 
            placeholder="To" value={""} type="number" 
            className="rounded text-sm text-gray-500" style={{width: '40%', height:'40', margin:'2%'}} 
          />

        </div>
      </div>
    </div>
  );
}

export function ColorFilter({ colors }: { colors: Array<string> }) {
  
  return (
    <div className="border-b border-t border-gray-200 py-3">
      <h3 className="-my-3 flow-root">
        <span className="font-thin text-white-600">Color</span>
      </h3>
      <div className="pt-6" id="filter-section-1">
        <div className="space-y-4">

          {colors.map((color, index) => (
            <div className="flex items-center" key={index}>
              <input id="filter-category-0" name="category[]" value={color} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="filter-category-0" className={`ml-3 text-sm text-${color.toLowerCase()}-600`}>{color}</label>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}