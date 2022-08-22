import React, { useContext, useRef } from "react";
import { ourContext } from "../context/ourContext";
import { ACTION } from "../context/ourContext";

const Addbudget = () => {
  const { showAddBudget, setshowAddBudget, dispatch } = useContext(ourContext);
  const nameRef = useRef();
  const maxRef = useRef();

  async function handleClick() {
    await dispatch({
      type: ACTION.ADD_BUDGET,
      payload: { nameRef, maxRef },
    });
    await setshowAddBudget("hidden");
    nameRef.current.value = "";
    maxRef.current.value = "";
  }
  return (
    <div
      className={`${showAddBudget} card absolute top-10 left-1/2 -translate-x-1/2 p-3 border-black border-2 bg-white h-fit w-10/12`}
    >
      <div>
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-2xl">New Budget</h1>
          <button
            onClick={() => setshowAddBudget("hidden")}
            className="p-2 bg-red-600 text-white"
          >
            CANCEL
          </button>
        </div>
        <label className="block" htmlFor="Name">
          Name
        </label>
        <input
          ref={nameRef}
          className="border-black border-2 w-full mb-4 p-1"
          type="text"
          id="Name"
        />
        <label className="block" htmlFor="num">
          Maximum spending
        </label>
        <input
          ref={maxRef}
          className="border-black border-2 w-full p-1"
          type="number"
          id="num"
        />
        <div className="flex justify-end mt-6">
          <button onClick={handleClick} className="p-2 bg-blue-800 text-white">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addbudget;
