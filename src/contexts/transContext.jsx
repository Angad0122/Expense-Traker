import { createContext, useState, useContext } from "react";

export const TransContext = createContext({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
});

export const TransProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    localStorage.setItem("transactions", JSON.stringify([...transactions, newTransaction]));
    console.log(localStorage.getItem("transactions"));

  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <TransContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransContext.Provider>
  );
};

export function useTrans() {
  return useContext(TransContext);
}
