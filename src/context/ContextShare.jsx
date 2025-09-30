import React, { createContext, useState } from "react";
//create a context for searching
export const SearchContext = createContext("");
function ContextShare({ children }) {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div>
      <SearchContext.Provider value={{ searchKey, setSearchKey }}>
        {children}
      </SearchContext.Provider>
    </div>
  );
}

export default ContextShare;
