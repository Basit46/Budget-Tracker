import React, { useContext } from "react";
import { ourContext } from "../context/ourContext";

const Total = () => {
  const { expenses, budgets } = useContext(ourContext);
  const init = 0;

  function getTotalexpenses() {
    const semitotal = expenses.map((expense) => parseFloat(expense.amount));
    const total = semitotal.reduce((prev, curr) => prev + curr, init);
    return total;
  }

  function getTotalbudget() {
    const semitotal = budgets.map((budget) => parseFloat(budget.max));
    const total = semitotal.reduce((prev, curr) => prev + curr, init);
    return total;
  }
  return (
    <div className="border-black border-2 px-2 h-fit min-w-fit mt-16 mb-2">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Total</h1>
        <div className="text-xl">
          ${getTotalexpenses()}/${getTotalbudget()}
        </div>
      </div>
      <progress
        className="progress relative w-full h-6"
        min={0}
        max={getTotalbudget()}
        value={getTotalexpenses()}
      ></progress>
    </div>
  );
};

export default Total;
