import { createBrwserRouter, RouterProvider} from 'react-router-dom'

// HomePage Structure
import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'article',
        element: <ArticlePage />,
      },
      ],
    },
];

const router = createBrwserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

