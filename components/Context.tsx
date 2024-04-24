import { createContext, useState } from "react";

export const Context = createContext({
  pages: null,
  setPages: null,
  selectedPage: null,
  setSelectedPage: null,
});

export function ContextProvider({ children }) {
  const [pages, setPages] = useState([""]);
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <Context.Provider
      value={{ pages, setPages, selectedPage, setSelectedPage }}
    >
      {children}
    </Context.Provider>
  );
}
