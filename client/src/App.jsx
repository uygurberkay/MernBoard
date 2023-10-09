import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Layout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Admin,
  Profile,
} from './pages';

import {action as registerAction} from './pages/Register';
import {action as loginAction} from './pages/Login';
import {action as addJobAction} from './pages/AddJob'
import {loader as dashboardLoader} from './pages/DashboardLayout';

/* Dark-theme setter and give to the Dashboard via props */
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme;
}

checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // Makes Default main page of that Hierarchy
        element: <Landing />
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children:[
          {
            index: true, // Makes Default main page of that Hierarchy
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />
          },
          {
            path: 'all-jobs',
            element: <AllJobs />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'admin',
            element: <Admin />
          },

        ]
      },
    ]
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App