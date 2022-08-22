import React, { useContext } from "react";
import { ourContext } from "../context/ourContext";
import Expense from "./Expense";
import { ACTION } from "../context/ourContext";
import { ACTION2 } from "../context/ourContext";

const ExpensesCard = () => {
  const {
    dispatch,
    dispatch2,
    showExpenseCard,
    setShowExpenseCard,
    expensesDisplay,
    budgetName,
  } = useContext(ourContext);
  const nameToUse = budgetName[0].name;
  //budgetName is still empty
  return (
    <div
      className={`${showExpenseCard} absolute top-10 left-0 right-0 p-3 px-4 border-black border-2 bg-white h-fit`}
    >
      <div className="flex justify-between items-center mb-4  border-b-2 border-gray-300 pb-1">
        <h1 className="text-3xl font-bold">Expenses - {nameToUse}</h1>
        <div>
          <button
            onClick={() => {
              dispatch({ type: ACTION.DELETE_BUDG, payload: { budgetName } });
              dispatch2({
                type: ACTION2.REMOVE_DELETED_BUDGET_EXPENSES,
                payload: { budgetName },
              });
              setShowExpenseCard("hidden");
            }}
            className="block mb-2 vsm:inline vsm:mb-0 border-red-400 border-2 px-2 py-1 text-red-400"
          >
            Delete
          </button>
          <button
            onClick={() => setShowExpenseCard("hidden")}
            className="bg-red-500 text-white ml-0 vsm:ml-2 px-2 py-1"
          >
            CANCEL
          </button>
        </div>
      </div>
      <div>
        {/* {console.log(expensesDisplay)} */}

        {expensesDisplay.map((theExpense) => (
          <Expense key={theExpense.id} thexpense={theExpense} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesCard;
