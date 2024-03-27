import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import ShowTrans from "./components/ShowTrans";
import { TransProvider, useTrans } from "./contexts/transContext";
import ShowGraph from "./components/ShowGraph";

function App() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transName, setTransName] = useState("");
  const [transAmount, setTransAmount] = useState();
  const { transactions, addTransaction, deleteTransaction } = useTrans();

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (!savedTransactions ) {
      addTransaction(savedTransactions);
    }
  }, []);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.sign === "+") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransHandler = (e) => {
    e.preventDefault();
    if (transName === "") alert("Please  enter a name for the transaction");
    else if (transAmount === 0) alert("Please enter the amount of transaction");
    else {
      const signElement = document.querySelector('input[name="transType"]:checked');
      if (!signElement) {
        alert("Please select type of transaction");
      } else {
        const transtime = new Date().toLocaleTimeString();
        const sign = signElement.value;
        const newTransaction = {
          name: transName,
          amount: parseFloat(transAmount),
          sign: sign,
          time: transtime,
        };
        console.log(newTransaction);
        addTransaction(newTransaction);
      }
    }
  };

  return (
      <div id="parentofmain">
        <div id="maindiv" className="">
          <h1 className="text-4xl text-center">
            <b>Expense Traker</b>
          </h1>
          <h3 className="mt-5 ">
            <b>Your Balance</b>
          </h3>
          {balance > 0 ? (
            <h2 className="text-3xl text-green-400 mb-3">
              <b>₹{balance}</b>
            </h2>
          ) : (
            <h2 className="text-3xl text-red-600 mb-3">
              <b>₹{balance}</b>
            </h2>
          )}
          <div id="incomeexpansediv" className="">
            <div>
              <h4 className="mr-5">
                <b>INCOME</b>
              </h4>
              <h4 id="income" className="mr-5 text-green-400">
                <b>+₹{income}</b>
              </h4>
            </div>
            <div>
              <h4 className="ml-5">
                <b>EXPENSES</b>
              </h4>
              <h4 id="expenses" className="ml-5 text-red-600">
                <b>-₹{expense}</b>
              </h4>
            </div>
          </div>
          <div className="m-10">
            <h3 className="">
              <b>HISTORY</b>
            </h3>
            <hr className="h-px  mb-5 mx-10 bg-gray-200 border-0 dark:bg-gray-500" />
            <div>
              <ShowTrans transactions={transactions || []} deleteTransaction={deleteTransaction} />
            </div>
          </div>
          <div>
            <h3 className="">
              <b>Add New Transaction</b>
            </h3>
            <hr className="h-px my-1 mx-12 bg-gray-200 border-0 dark:bg-gray-500" />
            {/* Form to add new transaction */}
            <div>
              <div className="m-2">
                <h4>Transaction Name</h4>
                <input onChange={(e) => setTransName(e.target.value)} value={transName} id="nameinput" className="p-2 text-center" type="text" placeholder="Enter Transaction Name" />
              </div>

              <div className="m-2">
                <h4>Amount</h4>
                <input onChange={(e) => setTransAmount(e.target.value)} value={transAmount} id="numberinput" className="p-2 text-center" type="number" placeholder="Enter Amount" />
              </div>
              <div className="m-2">
                <h4>Type</h4>
                <label className="mr-2">
                  <input type="radio" name="transType" value="+" /> Income (+)
                </label>
                <label className="ml-2">
                  <input type="radio" name="transType" value="-" /> Expense (-)
                </label>
              </div>
              <button onClick={addTransHandler} id="addbutton" className="text-white">
                Add Transaction
              </button>
            </div>
          </div>
          <hr className="h-px my-5 mx-12 bg-gray-200 border-0 dark:bg-gray-500" />
        </div>
        <ShowGraph/>
      </div>
  );
}

export default App;
