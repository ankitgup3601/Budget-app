import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const fetchData = (key) =>{
    return JSON.parse(localStorage.getItem(key));
}


const generateRandomColor = () =>{
    const length = fetchData("budgets")?.length ?? 0;
    return `${length} 65% 50%`
}

export const deleteItem = (key) =>{
    return localStorage.removeItem(key);
}

// logout

export const LogoutAction = async () =>{
    deleteItem("userName")
    deleteItem("expenses")
    deleteItem("budgets")
    toast.success("You've deleted your account")
    return redirect('/')
}

export const createBudget = ({
    name, amount
}) =>{
   const newItem = {
    id : crypto.randomUUID(),
    name,
    createdAt : Date.now(),
    amount : Number(amount),
    color : generateRandomColor()
   }
   const existingBudget = fetchData("budgets") ?? [];
   console.log(existingBudget)
   return localStorage.setItem("budgets", JSON.stringify([...existingBudget, newItem]));
}

export const waait = () => new Promise(res=>{
        setTimeout(res, Math.random()*1500);
})

export const createExpense = ({
    name, amount, budgetId
}) =>{
   const newItem = {
    id : crypto.randomUUID(),
    name,
    createdAt : Date.now(),
    amount : Number(amount),
    budgetId : budgetId
   }
   const existingBudget = fetchData("expenses") ?? [];
   console.log(existingBudget)
   return localStorage.setItem("expenses", JSON.stringify([...existingBudget, newItem]));
}

export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style : "currency",
        currency : "INR"
    })
}

export const calculateSpentBYBudget = (budgetId) =>{
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, curr)=>{
        if(curr.budgetId === budgetId) return acc+=curr.amount;
        return acc;
    }, 0)
    return budgetSpent
}

export const formatPercentage = (amt) =>{
    return amt.toLocaleString(undefined , {
        style : "percent",
    })
}

export const getCategory = (id) =>{
    const budgets = fetchData("budgets");
    let category;
    budgets.forEach((prod)=>{
        if(prod.id=== id){
            category = prod.name;
        }
    })
    return category
}

export const getAllMatchingItems = ({category, key, value}) =>{
    const data = fetchData(category) ?? [] ;
    return data.filter(item => item[key] === value)
}

export const deleteExpense = ({category , key}) =>{
    const data = fetchData(category);
    const newData = key && data.filter((item)=>item.id != key);
    localStorage.setItem(category, JSON.stringify(newData));
}


export const deleteBudget = async({category , key}) =>{
    const data = fetchData(category);
    const newData = key ? data.filter((item)=>item.id != key) : [];
    localStorage.setItem(category, JSON.stringify(newData));
    await redirect('/')
}


