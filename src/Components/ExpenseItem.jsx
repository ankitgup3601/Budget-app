import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { formatCurrency, getAllMatchingItems, getCategory } from "../helper";

const ExpenseItem = ({ expense }) => {
  const fetcher = useFetcher()
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>
        {new Date(expense.createdAt).toLocaleDateString(undefined, {month : 'short', day : 'numeric', year : 'numeric'})}
      </td>
      <td><Link className="btn btn--dark" to = {`/budget/${expense.budgetId}`}>{getCategory(expense.budgetId)}</Link></td>
      <td>
          <fetcher.Form method="post">
              <input type="hidden" name="_action" value="deleteExpense"/>
              <input type="hidden" name="expenseId" value={expense.id}/>
              <button
                type="submit"
                className="btn btn--dark"
                aria-label={`Delete ${expense.name} expense`}
              >
               <TrashIcon width={20}/>     
              </button>
          </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
