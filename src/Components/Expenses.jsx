import React from 'react'
import { Link, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteExpense, fetchData } from '../helper'
import Table from './Table';

export const expensesLoader = () =>{
    const expenses = fetchData("expenses");
    return {expenses};
}

export async function expenseAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
  
    if (_action == "deleteExpense") {
      deleteExpense({
        category : "expenses",
        key : values.expenseId
      });
      redirect('/')
      toast.success("Expense Deleted!");
    }
  
    return null;
  }

const Expenses = () => {
  const {expenses} = useLoaderData();
  const navigate = useNavigate();
  
  return (
    <div className='grid-lg'>
        <h1>All Expenses</h1>
        {
            expenses && expenses.length ?  (
                <div className='grid-md'>
                    <h2>
                        Recent Expenses <small>({expenses.length} total)</small>
                    </h2>
                    <Table expenses={expenses}/>
                </div>
            ) : <p>No expenses to show</p>
        } 
        <button className="btn btn--dark" onClick={()=> navigate(-1)}>Go back</button>
    </div>
  )
}

export default Expenses