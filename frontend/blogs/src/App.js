import {
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider,
  // Route,
} from 'react-router-dom';

import ErrorPage from './pages/Error';
// import HomePage from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Blogs from './pages/Blogs';
import RootLayout from './pages/Root';
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Blogs /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'blogs/:blogId', element: <BlogDetail /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> }
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
