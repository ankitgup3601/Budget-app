import React from "react";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { deleteBudget, deleteExpense, fetchData } from "../helper";
import Table from "./Table";
import BudgetItem from "./BudgetItem";
import AddExpenseForm from "./AddExpenseForm";
import { toast } from "react-toastify";

export const budgetLoader = ({ params }) => {
  const expenses = fetchData("expenses") ?? [];
  const budget = fetchData("budgets").filter(
    (item) => item.id === params.id
  )[0];
  return { expenses, id: params.id, budget };
};

export async function BudgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action == "deleteBudget") {
    deleteBudget({
      category: "budgets",
      key: values.budgetId,
    });
    toast.success("Budget Deleted!");
  }

  if (_action == "deleteExpense") {
    deleteExpense({
      category: "expenses",
      key: values.expenseId,
    });
    toast.success("Expense Deleted!");
  }

  return null;
}

const BudgetPage = () => {
  const { expenses, id, budget } = useLoaderData();
  const navigate = useNavigate();
  const list = expenses.filter((item) => item.budgetId == id);
  const fetcher = useFetcher();

  return budget && (
    <div className="grid-lg">
      <h1 className="h2">
        <span className="accent">{budget.name + " "}</span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      <h1 className="h2">
        <span className="accent">{budget.name + " "}</span>
        Expenses
      </h1>
      {list && list.length ? (
        <Table expenses={list} />
      ) : (
        <p>No Expenses to show !!</p>
      )}
      <div className="flex-lg">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          Go back
        </button>

        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteBudget" />
          <input type="hidden" name="budgetId" value={id} />
          <button className="btn btn--dark" type="submit">
            Delete Budget
          </button>
        </fetcher.Form>
      </div>
    </div>
  ) 
};

export default BudgetPage;
