import React from 'react'
import { Link } from 'react-router-dom'
import { calculateSpentBYBudget, formatCurrency, formatPercentage } from '../helper'

const BudgetItem = ({budget}) => {
    const {id, name, amount, color} = budget
    const spent = calculateSpentBYBudget(id)
  return (
    <div className="budget" style={{'--accent' : color}}>
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value = {spent}>
            {formatPercentage(spent/amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)} spent</small>
            <small>{formatCurrency(amount-spent)} remaining</small>
        </div>
        <Link className='btn btn--dark' to={`/budget/${budget.id}`}>Details</Link>
    </div>
  )
}

export default BudgetItem