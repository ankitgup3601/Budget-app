import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";
import AddExpenseForm from "../Components/AddExpenseForm";
import BudgetItem from "../Components/BudgetItem";
import Intro from "../Components/Intro";
import Table from "../Components/Table";
import { createBudget, createExpense, deleteExpense, fetchData, waait } from "../helper";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses")
  return { userName, budgets, expenses};
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action == "newUser") {
    localStorage.setItem("userName", JSON.stringify(values.userName));
    toast.success(`Welcome, ${values.userName}`);
  }

  if (_action == "createBudget") {
    await waait();
    createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
    toast.success("Budget Created!");
  }


  if (_action == "createExpense") {
    await waait();
    createExpense({
      name: values.newExpense,
      amount: values.newExpenseAmount,
      budgetId: values.newExpenseBudget,
    });
    toast.success("Expense Created!");
  }


  if (_action == "deleteExpense") {
    deleteExpense({
      category : "expenses",
      key : values.expenseId
    });
    toast.success("Expense Deleted!");
}

  return null;
}

const Dashboard = () => {
  const { userName, budgets, expenses} = useLoaderData();
  return (
    <div>
      {userName ? (
        <div>
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          {budgets && budgets.length ? (
            <div className="grid-sm">
              <div className="flex-lg">
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
              </div>
              <h2>Existing Budgets</h2>
              <div className="budgets">
                {
                  budgets.map((budget) =>(
                    <BudgetItem key={budget.id} budget = {budget}/>
                  ))
                }
              </div>
              <h2>Recent Expenses</h2>
              {
                expenses && expenses.length ? (
                  <div className="grid-md">
                    <Table expenses={expenses.sort((a, b)=> a.createdAt- b.createdAt)}/>
                    <Link to="expenses" className='btn btn--dark'>
                    view all expenses
                    </Link>
                  </div>
                ) : <p>Not Available!!</p>
              }
            </div>
          ) : (
            <div className="grid-sm">
              <p>Personal budgeting is the secret to financial freedom</p>
              <p>Create a budget to get started</p>
              <AddBudgetForm />
            </div>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};

export default Dashboard;
