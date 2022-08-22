import React, { useContext } from "react";
import { ourContext } from "../context/ourContext";
import { ACTION2 } from "../context/ourContext";

const Expense = ({ thexpense }) => {
  const { dispatch2, setExpenseId } = useContext(ourContext);
  return (
    <div className="flex justify-between items-center mb-2">
      <p className="font-semibold text-xl">{thexpense.desc}</p>
      <span className="flex items-center">
        <p className="mr-3">${thexpense.amount}</p>
        <button
          onClick={() => {
            dispatch2({
              type: ACTION2.REMOVE_EXP,
              payload: { thexpense },
            });
            setExpenseId(thexpense.budgetId);
          }}
          className="bg-red-600 text-white px-1 "
        >
          DEL
        </button>
      </span>
    </div>
  );
};

export default Expense;
