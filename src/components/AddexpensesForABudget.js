import React, { useContext, useRef } from "react";
import { ourContext } from "../context/ourContext";
import { ACTION2 } from "../context/ourContext";

const AddexpensesForABudget = () => {
  const {
    showAddExpenseForBudget,
    setshowAddExpenseForBudget,
    dispatch2,
    budgetSelectValue,
  } = useContext(ourContext);
  const selectRef = useRef();
  const descRef = useRef();
  const amountRef = useRef();

  async function handleClick2() {
    await dispatch2({
      type: ACTION2.ADD_EXPENSE,
      payload: { selectRef, descRef, amountRef },
    });
    await setshowAddExpenseForBudget("hidden");
    amountRef.current.value = "";
    descRef.current.value = "";
  }
  return (
    <div
      className={`${showAddExpenseForBudget} card absolute top-10 left-1/2 -translate-x-1/2 p-3 border-black border-2 bg-white h-fit w-10/12`}
    >
      <div>
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-2xl">New Expense</h1>
          <button
            onClick={() => setshowAddExpenseForBudget("hidden")}
            className="p-2 bg-red-600 text-white"
          >
            CANCEL
          </button>
        </div>
        <label className="block" htmlFor="Name">
          Description
        </label>
        <input
          ref={descRef}
          className="border-black border-2 w-full mb-4 p-1"
          type="text"
          id="Name"
        />
        <label className="block" htmlFor="num">
          Amount
        </label>
        <input
          ref={amountRef}
          className="border-black border-2 w-full mb-4 p-1"
          type="number"
          id="num"
        />
        <label className="block" htmlFor="budgetId">
          Budget
        </label>
        <select ref={selectRef} className="border-black border-2 w-full p-1">
          {budgetSelectValue.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end mt-6">
          <button onClick={handleClick2} className="p-2 bg-blue-800 text-white">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddexpensesForABudget;
