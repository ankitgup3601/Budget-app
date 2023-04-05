import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ExpenseItem from './ExpenseItem'

const Table = ({expenses, showBudget}) => {
  return (
    <div className="table">
        <table>
            <thead>
                <tr>
                    {["Name", "Amount", "Date", "Budget", "Delete"].map((i, index)=>{
                        return <th key={index}>{i}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    expenses.slice(0, 10).map((exp)=>{
                        return <tr key={exp.id}>
                            <ExpenseItem expense = {exp}/>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table