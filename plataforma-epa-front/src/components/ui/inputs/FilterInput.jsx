import { GlobalButton } from "@/components";

export const FilterInput = ({
  filterValue = '',
  setFilterValue='',
  placeholder='',
  inputClassName="bg-white w-100 p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3",
  handleKeyDown = () => {},
  handleSearch = () => {},
}) => {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={inputClassName}
      />
      <GlobalButton className="w-30" onClick={handleSearch}>
        Buscar
      </GlobalButton>
    </div>
  );
};
