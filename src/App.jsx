import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationLayout from './modules/Shared/Components/AuthenticationLayout/AuthenticationLayout'

import Register from './modules/Authentication/Components/Register/Register'
import ResetPass from './modules/Authentication/Components/Reset-pass/ResetPass'
import ForgetPass from './modules/Authentication/Components/Forget-pass/ForgetPass'
import VerifyAccount from './modules/Authentication/Components/Verify-account/VerifyAccount'
import NotFound from './modules/Shared/Components/NotFound/NotFound'
import MasterLayout from './modules/Shared/Components/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/Components/Dashboard/Dashboard'
import RecipesList from './modules/Recipes/Components/RecipesList/RecipesList'
import RecipeData from './modules/Recipes/Components/RecipeData/RecipeData'
import CategoriesList from './modules/Categories/CategoriesList/CategoriesList'
import CategoryData from './modules/Categories/CategoryData/CategoryData'
import UsersList from './modules/Users/Components/UsersList/UsersList'
import FavList from './modules/Favourites/Components/FavList/FavList'
import Login from './modules/Authentication/Components/Login/login'


function App() {
  // the first side from Route
  const routes = createBrowserRouter([
    // 2 main Layout
    // 1. هيكون فاضي لما اعمل Run for app
    {
        path:'',
        // AuthLayout inside it exist login,Register,Forget....
        element:<AuthenticationLayout/>,
        children:[
          // لما يكون الباث فاضي هي اول حاجه هتطلع لو كنا داخل الاب الاوث
          // الديفولت لو انا Auth
          {index:true, element:<Login/>},
           {path:'Log-in', element:<Login/>},
           {path:'register', element:<Register/>},
           {path:'reset-pass', element:<ResetPass/>},
           {path:'forget-pass', element:<ForgetPass/>},
           {path:'verify-account',element:<VerifyAccount/>}
        ],
         // لو كل الي داخل ال Auth الراوت مش صح بدنا نهدنل ال not found
         errorElement:<NotFound/>
    },
    // 2. الراوت التاني لل Master Layout
    { 
       path:'/dashboard',
       element:<MasterLayout/>,
       children:[
        // Defult Rout inside MasterLayout
        {index:true,element:<Dashboard/>},
        {path:"recipes", element:<RecipesList/>},
        {path:"recipe-Data", element:<RecipeData/>},
        {path:"categories", element:<CategoriesList/>},
        {path:"category-Data",element:<CategoryData/>},
        {path:"users",element:<UsersList/>},
        {path:"fav",element:<FavList/>},

      ],
       errorElement:<NotFound/>

      
    }
   
    
  
  ])
  return (
    <>
       {/* // the Secound side from Route */}
       <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
