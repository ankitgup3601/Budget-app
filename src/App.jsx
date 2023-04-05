import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { LogoutAction } from './helper';
import Main, { mainLoader } from './Layout/Main';
import Dashboard, { dashboardAction, dashboardLoader } from './Pages/Dashboard';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Error from './Pages/Error';
import Expenses, { expenseAction, expensesLoader } from './Components/Expenses';
import BudgetPage, { BudgetAction, budgetLoader } from './Components/BudgetPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element :<Main/>,
      loader : mainLoader,
      errorElement : <Error/>,
      children : [
        {
          path: "/",
          element :<Dashboard/>,
          loader : dashboardLoader,
          action : dashboardAction,
        },
        {
          path: "about",
          element: <h1>About</h1>,
        },
        {
          path: "logout",
          action : LogoutAction
        },
        {
          path : "expenses",
          element : <Expenses/>,
          loader : expensesLoader,
          action : expenseAction
        },
        {
          path : 'budget/:id',
          element : <BudgetPage/>,
          loader : budgetLoader,
          action : BudgetAction
        }
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router= {router}/>
      <ToastContainer/>
    </div>
  )
}

export default App
