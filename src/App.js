import React, { useContext } from "react";
import "./App.css";
import { ourContext } from "./context/ourContext";
import Budget from "./components/Budget";
import Addbudget from "./components/Addbudget";
import Addexpenses from "./components/Addexpenses";
import ExpensesCard from "./components/ExpensesCard";
import AddexpensesForABudget from "./components/AddexpensesForABudget";
import Total from "./components/Total";

//I made a detailed explanation on how this budget tracker works on the "ourContext.js"
function App() {
  const { budgets, setshowAddBudget, setshowAddExpense } =
    useContext(ourContext);
  return (
    <div className="w-screen h-screen p-2 sm:p-4 flex justify-center bg-blue-900 overflow-hidden ">
      <div className="main relative bg-white w-full h-full sm:w-5/6 md:w-4/6 lg:w-3/6 overflow-y-scroll">
        <div className="App pt-4 flex justify-center">
          <div className="w-11/12">
            <nav className=" flex justify-between items-center">
              <h1 className="font-extrabold text-2xl vsm:text-4xl ">Budgets</h1>
              <div>
                <a
                  onClick={() => setshowAddBudget("")}
                  href="#to"
                  className="block vsm:inline-block mb-4 vsm:mb-0 bg-blue-700 text-white font-semibold text-lg p-4 rounded-lg"
                >
                  Add Budget
                </a>
                <a
                  onClick={() => setshowAddExpense("")}
                  href="#to"
                  className="bg-white text-blue-700 border-blue-700 border-2 font-semibold text-lg p-3 ml-2 rounded-lg"
                >
                  Add Expenses
                </a>
              </div>
            </nav>
            <div className="mt-8 vsm:mt-3">
              {budgets.map((budget) => (
                <Budget key={budget.id} budget={budget} />
              ))}
              <Total />
            </div>
          </div>
        </div>
        <Addbudget />
        <Addexpenses />
        <AddexpensesForABudget />
        <ExpensesCard />
      </div>
    </div>
  );
}

export default App;
