import React, { useContext, useState, createContext } from "react";
const QueryContext = createContext();
export function useQuery() {
  return useContext(QueryContext);
}
export function QueryProvider({ children }) {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
}
