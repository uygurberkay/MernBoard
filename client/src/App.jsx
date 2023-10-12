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
  EditJob,
} from './pages';

import {action as loginAction} from './pages/Login';
import {action as addJobAction} from './pages/AddJob'
import {action as editJobAction} from './pages/EditJob'
import {action as registerAction} from './pages/Register';
import {action as deleteJobAction} from './pages/DeleteJob'
import {loader as adminLoader } from './pages/Admin';
import {loader as allJobsLoader} from './pages/AllJobs'
import {loader as editJobLoader} from './pages/EditJob';
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
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          }
        ]
      },
    ]
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App