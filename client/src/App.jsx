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
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children:[
          {
            index: true, // Makes Default main page of that Hierarchy
            element: <AddJob />
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