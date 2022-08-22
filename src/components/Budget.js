import React, { useContext } from "react";
import { ourContext } from "../context/ourContext";

const Budget = ({ budget }) => {
  const {
    expenses,
    expensesToShow,
    setshowAddExpenseForBudget,
    setbudgetSelectValue,
  } = useContext(ourContext);

  function handleClick() {
    setshowAddExpenseForBudget("");
    setbudgetSelectValue([budget]);
  }

  const init = 0;
  function getTotal(id) {
    const semitotal = expenses
      .filter((expense) => expense.budgetId === id)
      .map((expense) => parseFloat(expense.amount));
    const total = semitotal.reduce((prev, curr) => prev + curr, init);
    return total;
  }

  return (
    <div
      className={`${
        getTotal(budget.id) >= budget.max ? "bg-red-600" : ""
      } border-black-300 border-2 px-2 h-36 min-w-fit mb-2`}
    >
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">{budget.name}</h1>
        <div className="text-xl">
          ${getTotal(budget.id)}/${budget.max}
        </div>
      </div>
      <progress
        style={{}}
        className="progress relative w-full h-6"
        min={0}
        max={budget.max}
        value={getTotal(budget.id)}
      ></progress>
      <div className="mt-6 flex justify-end ">
        <div>
          <a
            onClick={handleClick}
            href="#to"
            className="bg-blue-700 text-white font-semibold text-lg p-4 rounded-lg"
          >
            Add Expense
          </a>
          <a
            onClick={() => expensesToShow(budget.id)}
            href="#to"
            className="bg-white text-blue-700 border-blue-700 border-2 font-semibold text-lg p-3 ml-2 rounded-lg"
          >
            View Expenses
          </a>
        </div>
      </div>
    </div>
  );
};

export default Budget;
