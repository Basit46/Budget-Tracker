import { createContext, useReducer, useState, useEffect } from "react";

export const ourContext = createContext();

//ACTION AND ACTION2 are used for the switch cases in the respective reducers
//and were hard coded so as to prevent errors
export const ACTION = {
  ADD_BUDGET: "add",
  DELETE_BUDG: "delete budget",
};
export const ACTION2 = {
  ADD_EXPENSE: "addexpense",
  REMOVE_EXP: "removeexpense",
  REMOVE_DELETED_BUDGET_EXPENSES: "removedeletedbudgetexpenses",
};

//reducer is used for handling the budgets
//reducer2 is used for handling expenses
function reducer(budgets, action) {
  switch (action.type) {
    case ACTION.ADD_BUDGET:
      if (
        action.payload.nameRef.current.value === "" ||
        action.payload.maxRef.current.value === ""
      ) {
        return budgets;
      }

      return [
        ...budgets,
        {
          id: Date.now(),
          name: action.payload.nameRef.current.value,
          amount: 0,
          max: action.payload.maxRef.current.value,
        },
      ];
    case ACTION.DELETE_BUDG:
      return budgets.filter(
        (budget) => budget.id !== action.payload.budgetName[0].id
      );
    default:
      return budgets;
  }
}

function reducer2(expenses, action) {
  switch (action.type) {
    case ACTION2.ADD_EXPENSE:
      if (
        action.payload.descRef.current.value === "" ||
        action.payload.amountRef.current.value === ""
      ) {
        return expenses;
      }
      return [
        ...expenses,
        {
          id: Date.now(),
          budgetId: parseFloat(action.payload.selectRef.current.value),
          desc: action.payload.descRef.current.value,
          amount: action.payload.amountRef.current.value,
        },
      ];
    case ACTION2.REMOVE_EXP:
      return expenses.filter(
        (expense) => expense.id !== action.payload.thexpense.id
      );
    case ACTION2.REMOVE_DELETED_BUDGET_EXPENSES:
      return expenses.filter(
        (expense) => expense.budgetId !== action.payload.budgetName[0].id
      );
    default:
      return expenses;
  }
}

export const UseProvider = ({ children }) => {
  //budgets: it includes a default value so as the expenses

  const budgetsReturned = localStorage.getItem("budgets");
  const budgetsResult = budgetsReturned
    ? JSON.parse(budgetsReturned)
    : [{ name: "Food", id: 1, max: 2000 }];
  const [budgets, dispatch] = useReducer(reducer, budgetsResult);
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const expensesReturned = localStorage.getItem("expenses");
  const expensesResult = expensesReturned
    ? JSON.parse(expensesReturned)
    : [
        {
          id: 3,
          budgetId: 1,
          desc: "Indomie",
          amount: 1000,
        },
      ];
  const [expenses, dispatch2] = useReducer(reducer2, expensesResult);
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  //expensesDisplay were the state displayed on the screens
  //and it uses values from the expenses state
  //when a user request for expenses for a particular budget
  //,the expenses display filter out the needed expenses from the display
  //In simple words, IT IS A MIRROR OF THE EXPENSES
  const [expensesDisplay, setExpensesDisplay] = useState([
    {
      id: 30,
      budgetId: 10,
      desc: "Indomie",
      amount: 1000,
    },
  ]);

  //showAddBudget,showAddExpense and showExpenseCard: they all handle the opening and
  //closing of their respectives
  const [showAddBudget, setshowAddBudget] = useState("hidden");
  const [showAddExpense, setshowAddExpense] = useState("hidden");
  const [showExpenseCard, setShowExpenseCard] = useState("hidden");
  const [showAddExpenseForBudget, setshowAddExpenseForBudget] =
    useState("hidden");
  const [budgetSelectValue, setbudgetSelectValue] = useState([]);
  const [budgetName, setbudgetName] = useState([
    {
      id: 1,
      name: "Food",
      max: 2000,
    },
  ]);
  const [expenseId, setExpenseId] = useState("");

  //as i stated in the one of the comments above,the following two functions
  //handle the the requests for expenses to be returned out for a particular budget
  //and they are displayed on the expensesdisplay
  function expensesToShow(theId) {
    setShowExpenseCard("");
    showTheExpenses(theId);
    setbudgetName(budgets.filter((budget) => budget.id === theId));
  }
  function showTheExpenses(id) {
    setExpensesDisplay(expenses.filter((expense) => expense.budgetId === id));
  }

  //when users delete expense,the expensesdisplay needs to be updated as it
  //is the mirror state of the expenses state
  useEffect(() => {
    setExpensesDisplay(
      expenses.filter((expense) => expense.budgetId === expenseId)
    );
  }, [expenses, expenseId]);

  //I returned out all the states and functions that were needed
  return (
    <ourContext.Provider
      value={{
        budgets,
        dispatch,
        expenses,
        dispatch2,
        showAddBudget,
        setshowAddBudget,
        showAddExpense,
        setshowAddExpense,
        expensesDisplay,
        showExpenseCard,
        setShowExpenseCard,
        expensesToShow,
        showAddExpenseForBudget,
        setshowAddExpenseForBudget,
        budgetSelectValue,
        setbudgetSelectValue,
        budgetName,
        setbudgetName,
        setExpenseId,
      }}
    >
      {children}
    </ourContext.Provider>
  );
};
